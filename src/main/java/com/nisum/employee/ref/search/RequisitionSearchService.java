package com.nisum.employee.ref.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.Requisition;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RequisitionSearchService {
	

	@Autowired
	private RequisitionIndexRepository requisitionIndexRepository;
	
	public List<Requisition> getAllRequisitionDetails() throws Exception {
		Iterable<Requisition> requisition = requisitionIndexRepository.findAll();
		List<Requisition> interviewDetailsList = Lists.newArrayList(requisition);
		return interviewDetailsList;
	}
	
	public List<Requisition> getRequisitionReqIdOrPositionOrClientByNameOrStatus(String requisitionId,String position, String client) throws Exception {
		Requisition requisition;
		List<Requisition> requisitionList = requisitionIndexRepository.findByPositionStartingWithOrClientStartingWithAllIgnoreCaseOrStatusStartingWithOrderByUpdatedDateDesc(requisitionId, position, client,client.toUpperCase());
		if(requisitionList.isEmpty()){
			requisition=requisitionIndexRepository.findOne(requisitionId);
			requisitionList=new ArrayList<>();
			requisitionList.add(requisition);
		}
		return requisitionList;
	}
	
	public Requisition getRequisitionById(String requisitionId) throws Exception {
		Requisition requisitionList = requisitionIndexRepository.findByRequisitionIdStartingWithAllIgnoreCase(requisitionId);
		return requisitionList;
	}
	
	public Requisition addRequisitionIndex(Requisition requisition) {
		Requisition requisitionData = null;
		try {
			requisitionData = requisitionIndexRepository.save(requisition);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		
		return requisitionData;
	}
	
	public void updateRequisitionIndex(Requisition requisition){
		try{
			if(requisitionIndexRepository.exists(requisition.getRequisitionId())){
			requisitionIndexRepository.delete(requisition.getRequisitionId());
			addRequisitionIndex(requisition);
			}else{
				addRequisitionIndex(requisition);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
	
	
}
