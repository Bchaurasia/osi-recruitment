package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.repository.RequisitionRepository;

@Service
public class RequisitionService implements IRequisitionService{
	
	@Autowired
	private RequisitionRepository requisitionRepository;
	
	@Override
	public void prepareRequisition(Requisition requisition) {
		if(requisition.getApproval2().getName() == null && 
				requisition.getApproval2().getEmailId() == null){
			requisition.setApproval2(null);
		}
		requisitionRepository.prepareRequisition(requisition);
	}

	@Override
	public void updateRequisition(Requisition requisition) {
		requisitionRepository.updateRequisition(requisition);
	}
	
	@Override
	public Requisition retrieveRequisitionBasedOnId(String requisitionId) {
		return requisitionRepository.retrieveRequisitionBasedOnId(requisitionId);
	}
	
	@Override
	public List<Requisition> retrieveRequisitionsByClient(String client) {
		return requisitionRepository.retrieveRequisitionsByClient(client);
	}
	
	@Override
	public List<Requisition> retrieveAllRequistions() {
		return requisitionRepository.retrieveAllRequisitions();
	}
	
	@Override
	public List<Requisition> retrieveRequisitionsByPosition(String position) {
		return requisitionRepository.retrieveRequisitionsByPosition(position);
	}
	
}