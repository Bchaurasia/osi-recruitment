package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.Requisition;


public interface IRequisitionService {
	public void prepareRequisition(Requisition requisition);
	public void updateRequisition(Requisition requisition);
	public List<Requisition> retrieveAllRequistions();
	public Requisition retrieveRequisitionBasedOnId(String requisitionId);
	public List<Requisition> retrieveRequisitionsByClient(String client);
	public List<Requisition> retrieveRequisitionsByPosition(String position);
	
}
