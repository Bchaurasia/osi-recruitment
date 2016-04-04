package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;


public interface IRequisitionService {
	public void prepareRequisition(Requisition requisition);
	public RequisitionApproverDetails updateRequisition(Requisition requisition);
	public void rejectRequisition(Requisition requisition);
	public String approveRequisition(Requisition requisition);
	public List<Requisition> retrieveAllRequistions();
	public Requisition retrieveRequisitionBasedOnId(String requisitionId);
	public List<Requisition> retrieveRequisitionsByClient(String client);
	public List<Requisition> retrieveRequisitionsByPosition(String position);
	
}
