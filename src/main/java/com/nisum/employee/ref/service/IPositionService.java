package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.PositionAggregate;
import com.nisum.employee.ref.domain.Requisition;

public interface IPositionService {
	public void preparePosition(Position position);

	public void updatePosition(Position position);

	public List<Position> retrievePositionByClient(String client);

	public List<Position> retrieveAllPositions();

	public List<Position> retrievePositionsbasedOnDesignation(String designation);

	public Position retrievePositionsbasedOnJobCode(String jobcode);
	
	public List<Position> retrievePositionsbasedOnRequisitionId(String requisitionId);

	public Position deletePositionBasedOnJC(String jobcode);

	public List<Position> retrievePositionbasedOnLocation(String location);

	public List<PositionAggregate> retrieveAllPositionsAggregate();
	
	public void createRequitionPosition(Requisition requisition);
}
