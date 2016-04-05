package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.PositionAggregate;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.repository.PositionRepository;
import com.nisum.employee.ref.repository.SequenceRepository;
import com.nisum.employee.ref.search.PositionSearchService;

@Service
public class PositionService implements IPositionService {

	private static final String ACTIVE = "Active";

	@Autowired
	PositionRepository positionRepository;

	@Autowired
	SequenceRepository sequenceRepository;

	@Autowired
	PositionSearchService positionSearchService;

	public void preparePosition(Position position) {
		positionRepository.preparePosition(position);
	}

	public void updatePosition(Position position) {
		try {
			Position updatedPosition = positionRepository.updatePosition(position);
			positionSearchService.updatePositionIndex(updatedPosition);
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

	public Position deletePositionBasedOnJC(String jobcode) {
		return positionRepository.deletePositionBasedOnJC(jobcode);
	}

	public List<Position> retrievePositionbasedOnLocation(String location) {
		return positionRepository.retrievePositionbasedOnLocation(location);
	}

	public List<PositionAggregate> retrieveAllPositionsAggregate() {
		return positionRepository.retrieveAllPositionsAggregate();
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
		position.setClient(requisition.getClient());
		position.setRequisitionId(requisition.getRequisitionId());
		position.setDesignation(requisition.getPosition());
		position.setLocation(requisition.getLocation());
		position.setMinExpYear(requisition.getMinExpYear());
		position.setMaxExpYear(requisition.getMaxExpYear());
		position.setPrimarySkills(requisition.getSkillType());
		position.setInterviewRounds(interviewRounds);
		position.setHiringManager(requisition.getRequisitionManager());
		position.setJobcode("JOB_" + sequenceRepository.getNextSequenceId("JOB"));
		position.setCreatedBy(requisition.getCreatedBy());
		position.setUpdatedBy(requisition.getCreatedBy());
//		position.setCreatedDate(new DateTime());
//		position.setUpdatedDate(new DateTime());
		return position;
	}

	private ArrayList<String> getInterviewRounds() {
		ArrayList<String> interviewRounds = new ArrayList<>();
		interviewRounds.add("Technical Round 1");
		interviewRounds.add("Technical Round 2");
		interviewRounds.add("Hr Round");
		interviewRounds.add("Manager Round");
		return interviewRounds;
	}
}