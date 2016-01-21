package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.PositionAggregate;
import com.nisum.employee.ref.repository.PositionRepository;

@Service
public class PositionService implements IPositionService{

	@Autowired
	PositionRepository positionRepository;
	@Override
	public void preparePosition(Position position) {
		positionRepository.preparePosition(position);
	}
	@Override
	public void updatePosition(Position position) {
		positionRepository.updatePosition(position);
	}
	@Override
	public List<Position> retrievePositionByClient(String client) {
		return positionRepository.retrievePositionByClient(client);
	}
	@Override
	public List<Position> retrieveAllPositions() {
		return positionRepository.retrieveAllPositions();
	}
	@Override
	public List<Position> retrievePositionsbasedOnDesignation(String designation) {
		return positionRepository.retrievePositionsbasedOnDesignation(designation);
	}
	@Override
	public Position retrievePositionsbasedOnJobCode(String jobcode) {
		return positionRepository.retrievePositionsbasedOnJobCode(jobcode);
	}
	@Override
	public Position deletePositionBasedOnJC(String jobcode) {
		return positionRepository.deletePositionBasedOnJC(jobcode);
	}
	@Override
	public List<Position> retrievePositionbasedOnLocation(String location) {
		return positionRepository.retrievePositionbasedOnLocation(location);
	}
	
	@Override
	public List<PositionAggregate> retrieveAllPositionsAggregate() {
		return positionRepository.retrieveAllPositionsAggregate();
	}

}