package com.nisum.employee.ref.search;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.Requisition;

@Service
public class RequisitionSearchService {
	

	@Autowired
	private RequisitionIndexRepository requisitionIndexRepository;
	
	public List<Requisition> getAllRequisitionDetails() throws Exception {
		Iterable<Requisition> requisition = requisitionIndexRepository.findAll();
		List<Requisition> interviewDetailsList = Lists.newArrayList(requisition);
		return interviewDetailsList;
	}
	
	public List<Requisition> getRequisitionByName(String position, String client) throws Exception {
		List<Requisition> requisitionList = requisitionIndexRepository.findByPositionStartingWithOrClientStartingWithAllIgnoreCase(position, client);
		return requisitionList;
	}
	
	public Requisition getRequisitionById(String requisitionId) throws Exception {
		Requisition requisitionList = requisitionIndexRepository.findByRequisitionIdStartingWithAllIgnoreCase(requisitionId);
		return requisitionList;
	}
	
	public Requisition addRequisitionIndex(Requisition requisition) throws Exception {
		Requisition requisitionData = requisitionIndexRepository.save(requisition);
		return requisitionData;
	}
	
	public void updateRequisitionIndex(Requisition requisition) throws Exception {
		
		if(requisitionIndexRepository.exists(requisition.getRequisitionId()) ){
			requisitionIndexRepository.delete(requisition.getRequisitionId());
			addRequisitionIndex(requisition);
		}
	}
	
	
}
