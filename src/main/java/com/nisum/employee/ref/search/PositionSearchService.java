package com.nisum.employee.ref.search;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Series;

import groovy.util.logging.Slf4j;

@Slf4j
@Service
public class PositionSearchService {

	@Autowired
	private PositionIndexRepository positionIndexRepository;

	@Autowired
	private PositionIndexQueryRepository indexRepositoryImpl;

	public List<Position> getAllPostions() {
		Iterable<Position> position = positionIndexRepository.findAll();
		List<Position> positionList = Lists.newArrayList(position);
		/*try {
			Collections.sort(positionList, new Comparator<Position>() {
				public int compare(Position o1, Position o2) {
					return o2.getUpdatedDate().compareTo(o1.getUpdatedDate());
				}
			});
		} catch (Exception e) {
			e.printStackTrace();
		}*/

		return positionList;
	}
	public List<Position> getPositionForRequisitionId(String reqId)
	{
		List<Position> positionList=indexRepositoryImpl.findPositionForRequisitionId(reqId);
		return positionList;
	}

	public List<Position> getPostionByDesignationOrClient(String data) throws Exception {
		List<Position> positionList = indexRepositoryImpl
				.findPositionsByDesignationStartingWithOrClientStartingWithAllIgnoreCaseOrJobTypeOrJobLocationContains(data);
		return positionList;

	}

	public Position addPositionIndex(Position position) {
		Position positionData = positionIndexRepository.save(position);
		return positionData;
	}

	public void updatePositionIndex(Position position) throws Exception {
		if (positionIndexRepository.exists(position.getJobcode())) {
			positionIndexRepository.delete(position.getJobcode());
			addPositionIndex(position);
		} else {
			addPositionIndex(position);
		}
	}
	
	public List<Position> retrieveAllPositionsBySpecificDate() {
		return indexRepositoryImpl.findPositionsBetweenSpecificDates();
		
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
			//series2.setName();
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
