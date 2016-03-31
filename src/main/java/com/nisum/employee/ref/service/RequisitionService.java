package com.nisum.employee.ref.service;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;
import com.nisum.employee.ref.repository.RequisitionRepository;
import com.nisum.employee.ref.repository.SequenceRepository;

@Service
public class RequisitionService implements IRequisitionService{
	
	private static final String REQ = "REQ_";
	private static final String PARTIALY_APPROVED = "PARTIALY APPROVED";
	private static final String APPROVED = "APPROVED";
	private static final String REQUISITION_HAS_APPROVED_SUCCESSFULLY = " Requisition has approved successfully ";
	private static final String REJECTED = "REJECTED";
	private static final String INTIATED = "INTIATED";
	
	@Autowired
	private RequisitionRepository requisitionRepository;
	
	@Autowired
	private SequenceRepository sequenceRepository;
	
	@Autowired
	private PositionService positionService;
	
	@Autowired
	private JobRequisitionNotificationService jobRequisitionNotificationService;
	
	@Override
	public void prepareRequisition(Requisition requisition) {
		requisition.setStatus(INTIATED);
		requisition.setRequisitionId(REQ+sequenceRepository.getNextSequenceId("REQ"));
		try {
			requisitionRepository.prepareRequisition(requisition);
			jobRequisitionNotificationService.sendNotification(requisition);
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public RequisitionApproverDetails updateRequisition(Requisition requisition) {
		RequisitionApproverDetails RequisitionApproverDetails = null;
		try {
			requisitionRepository.updateRequisition(requisition);
			RequisitionApproverDetails = jobRequisitionNotificationService.sendNotification(requisition);
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		return RequisitionApproverDetails;
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

	@Override
	public void rejectRequisition(Requisition requisition) {
		requisition.setStatus(REJECTED);
		requisitionRepository.updateRequisition(requisition);
		try {
			jobRequisitionNotificationService.sendNotification(requisition);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	@Override
	public String approveRequisition(Requisition requisition) {
		if((requisition.getApproval2() == null && requisition.getApproval1().isApproved()) ||
		   (requisition.getApproval2() != null && requisition.getApproval1().isApproved() 
			&& requisition.getApproval2().isApproved())){
			requisition.setStatus(APPROVED);
			positionService.createRequitionPosition(requisition);
			updateRequisition(requisition);
			return requisition.getRequisitionId() +REQUISITION_HAS_APPROVED_SUCCESSFULLY +requisition.getNoOfPositions() +" Number Positions created successfully" ;
		}
		else{
			requisition.setStatus(PARTIALY_APPROVED);
			updateRequisition(requisition);
			try {
				jobRequisitionNotificationService.sendNotification(requisition);
			} catch (MessagingException e) {
				e.printStackTrace();
			}
			return requisition.getRequisitionId() +REQUISITION_HAS_APPROVED_SUCCESSFULLY+ ", sent approve request notification to"+requisition.getApproval2().getName();
		}
	}
	
}