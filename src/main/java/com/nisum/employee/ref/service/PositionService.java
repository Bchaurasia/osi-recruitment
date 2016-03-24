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

@Service
public class PositionService implements IPositionService{

	@Autowired
	PositionRepository positionRepository;
	
	@Autowired
	RequisitionService requisitionService;
	
	@Autowired
	SequenceRepository sequenceRepository;
	
	public void preparePosition(Position position) {
		positionRepository.preparePosition(position);
	}
	
	public void updatePosition(Position position) {
		positionRepository.updatePosition(position);
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
	               positionRepository.preparePosition(buildPosition(requisition, i));
	               }
	               requisitionService.updateRequisition(requisition);
	}

	private Position buildPosition(Requisition requisition, int sequence) {
		Position position = new Position();
		ArrayList<String> interviewRounds=new ArrayList<>();
		interviewRounds.add("Technical Round 1");
		interviewRounds.add("Technical Round 2");
		interviewRounds.add("Hr Round");
		interviewRounds.add("Manager Round");
		position.setClient(requisition.getClient());
		position.setDesignation(requisition.getPosition());
		position.setLocation(requisition.getLocation());
		position.setMinExpYear(requisition.getMinExpYear());
		position.setMaxExpYear(requisition.getMaxExpYear());
		position.setPrimarySkills(requisition.getSkillType());
		position.setInterviewRounds(interviewRounds);
		position.setHiringManager(requisition.getRequisitionManager());
        position.setJobcode("JOB_"+sequenceRepository.getNextSequenceId("JOB"));
		return position;
	}
}