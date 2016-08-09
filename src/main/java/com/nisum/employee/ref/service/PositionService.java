package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.PositionAggregate;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.Series;
import com.nisum.employee.ref.repository.PositionRepository;
import com.nisum.employee.ref.repository.SequenceRepository;
import com.nisum.employee.ref.search.PositionSearchService;

@Service
public class PositionService implements IPositionService {

	private static final String ACTIVE = "Active";
	private static final String PRIORITY_LOW = "Low";

	@Autowired
	PositionRepository positionRepository;

	@Autowired
	SequenceRepository sequenceRepository;

	@Autowired
	PositionSearchService positionSearchService;
	
	@Autowired
	private NotificationService notificationService;

	public void preparePosition(Position position) {
		positionRepository.preparePosition(position);
	}

	public void updatePosition(Position position) {
		try {
			position.setUpdatedDate(new Date());
			Position updatedPosition = positionRepository.updatePosition(position);
			positionSearchService.updatePositionIndex(updatedPosition);
			notificationService.sendPositionUpdateNotification(position);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<Position> retrievePositionByClient(String client) {
		return positionRepository.retrievePositionByClient(client);
	}

	public List<Position> retrieveAllPositions() {
		return positionRepository.retrieveAllPositions();
	}

	public List<Position> retrievePositionsbasedOnDesignation(String designation) {
		return positionRepository.retrievePositionsbasedOnDesignation(designation);
	}

	public Position retrievePositionsbasedOnJobCode(String jobcode) {
		return positionRepository.retrievePositionsbasedOnJobCode(jobcode);
	}

	public List<Position> retrievePositionsbasedOnRequisitionId(String requisitionId) {
		return positionRepository.retrievePositionsbasedOnrequisitionId(requisitionId);
	}

	public Position deletePositionBasedOnJC(String jobcode) {
		return positionRepository.deletePositionBasedOnJC(jobcode);
	}

	public List<Position> retrievePositionbasedOnLocation(String location) {
		return positionRepository.retrievePositionbasedOnLocation(location);
	}

	public List<PositionAggregate> retrieveAllPositionsAggregate() {
		return positionRepository.retrieveAllPositionsAggregate();
	}

	public List<Position> retrievePositionsbasedOnPositionType(String positionType) {
		return positionRepository.retrievePositionsbasedOnPositionType(positionType);
	}

	@Override
	public void createRequitionPosition(Requisition requisition) {
		for (int i = 1; i <= Integer.valueOf(requisition.getNoOfPositions()); i++) {
			try {
				Position position = buildPosition(requisition, i);
				positionRepository.preparePosition(position);
				positionSearchService.addPositionIndex(position);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	private Position buildPosition(Requisition requisition, int sequence) {
		Position position = new Position();
		ArrayList<String> interviewRounds = getInterviewRounds();
		position.setStatus(ACTIVE);
		position.setPriority(PRIORITY_LOW);
		position.setClient(requisition.getClient());
		position.setRequisitionId(requisition.getRequisitionId());
		position.setDesignation(requisition.getPosition());
		position.setLocation(requisition.getLocation());
		position.setMinExpYear(requisition.getMinExpYear());
		position.setMaxExpYear(requisition.getMaxExpYear());
		position.setPrimarySkills(requisition.getSkillType());
		position.setInterviewRounds(interviewRounds);
		//position.setHiringManager(requisition.getRequisitionManager());
		position.setJobcode("JOB_" + sequenceRepository.getNextSequenceId("JOB"));
		position.setCreatedBy(requisition.getCreatedBy());
		position.setUpdatedBy(requisition.getCreatedBy());
		position.setJobProfile(requisition.getJobDescription());
		position.setTargetDate(requisition.getTargetDate());
		position.setUpdatedDate(new Date());
		position.setCreatedDate(new Date());
		position.setUpdatedBy(requisition.getUpdatedBy());
		position.setCreatedBy(requisition.getUpdatedBy());
		if(null!=requisition.getAdditionalSkills()){
			position.setSecondarySkills(requisition.getAdditionalSkills());
		}
		position.setJobType(requisition.getJobType());
		return position;
	}

	private ArrayList<String> getInterviewRounds() {
		ArrayList<String> interviewRounds = new ArrayList<>();
		interviewRounds.add("Level 1");
		interviewRounds.add("Level 2");
		interviewRounds.add("HR");
		interviewRounds.add("Managerial");
		return interviewRounds;
	}
	public List<Position> retrieveAllPositionsBySpecificDate() {
		return positionRepository.getPositionOfSpecificDate();
	}
	public Series.LayerTwo setLayerTwoDataForDashboard(String status) {
		Series.LayerTwo series1 = new Series.LayerTwo();
		series1.setId(status);
		series1.setName(status);
		List<Position> positionsDetails = retrieveAllPositionsBySpecificDate();
		Series.LayerTwo.Data data = null;
		Set<Series.LayerTwo.Data> dataList = new HashSet<Series.LayerTwo.Data>();
		List<String> count = new ArrayList<String>();
		for (Position position : positionsDetails) {
			if (status.equals(position.getStatus())) {
				count.add(position.getDesignation());
			}

		}
		for (Position position : positionsDetails) {
			if (status.equals(position.getStatus())) {
				data = new Series.LayerTwo.Data();
				data.setY(Collections.frequency(count, position.getDesignation()));
				data.setName(position.getDesignation());
				data.setDrilldown(status + ":" + position.getDesignation());
				dataList.add(data);
			}

		}
		List<Series.LayerTwo.Data> list = new ArrayList<>(dataList);
		series1.setData(list);
		return series1;
	}
	
	public List<Series.LayerThree> setLayerThreeDataForDashboard(String status) {
		List<Position> positionsDetails = retrieveAllPositionsBySpecificDate();
		Set<String> uniqueDesigns = new HashSet<String>();
		for (Position position : positionsDetails) {
			uniqueDesigns.add(position.getDesignation());
		}

		Map<String, Integer> clients = null;
		Map<String, Map<String, Integer>> layerThreeData = new HashMap<String, Map<String, Integer>>();
		for (String uniqueDesign : uniqueDesigns) {
			clients = new HashMap<String, Integer>();
			List<String> ClientList = new ArrayList<String>();
			for (Position position : positionsDetails) {
				if (status.equals(position.getStatus()) && position.getDesignation().equals(uniqueDesign)) {
					ClientList.add(position.getClient());
				}
			}
			for (String client : ClientList) {
				Integer clientCount = clients.get(client);
				if (clientCount == null)
					clientCount = 0;
				clients.put(client, clientCount + 1);
			}
			layerThreeData.put(status + ":" + uniqueDesign, clients);
		}

		Series.LayerThree.Data data3 = null;
		List<String> data4 = null;

		List<Series.LayerThree> list1 = new ArrayList<>();

		for (Map.Entry<String, Map<String, Integer>> entry : layerThreeData.entrySet()) {
			Series.LayerThree series2 = new Series.LayerThree();

			series2.setId(entry.getKey());

			for (Map.Entry<String, Integer> innerEntry : entry.getValue().entrySet()) {
				data3 = new Series.LayerThree.Data();
				data4 = new ArrayList<>();

				data3.setClient(innerEntry.getKey());
				data3.setCount(innerEntry.getValue());

				data4.add(innerEntry.getKey());
				data4.add(innerEntry.getValue().toString());
				series2.getData().add(data4);
			}
			list1.add(series2);
		}
		return list1;
	}

}