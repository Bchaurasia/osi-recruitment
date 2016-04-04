package com.nisum.employee.ref.service;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;
import com.nisum.employee.ref.repository.RequisitionRepository;

@Service
public class RequisitionService implements IRequisitionService {
	// TODO:move status code into ENUM
	private static final String REJECTED = "REJECTED";
	private static final String INITIATED = "INITIATED";
	private static final String APPROVED = "APPROVED";
	private static final String PARTIALY_APPROVED = "PARTIALY APPROVED";

	@Autowired
	private RequisitionRepository requisitionRepository;

	@Autowired
	PositionService positionService;

	@Autowired
	private JobRequisitionNotificationService jobRequisitionNotificationService;

	@Override
	public void prepareRequisition(Requisition requisition)  {
		if (requisition.getApproval2().getName() == null
				&& requisition.getApproval2().getEmailId() == null) {
			requisition.setApproval2(null);
		}
		requisition.setStatus(INITIATED);
		try {
			requisitionRepository.prepareRequisition(requisition);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try {
			jobRequisitionNotificationService.sendNotification(requisition);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	@Override
	public RequisitionApproverDetails updateRequisition(Requisition requisition)
			throws AddressException, MessagingException {
		requisitionRepository.updateRequisition(requisition);
		return jobRequisitionNotificationService.sendNotification(requisition);
	}

	private static final String REQUISITION_HAS_APPROVED_SUCCESSFULLY = " Requisition has approved successfully ";

	@Override
	public String approveRequisition(Requisition requisition)
			throws AddressException, MessagingException {
		if ((requisition.getApproval2() == null && requisition.getApproval1().isApproved())
			|| (requisition.getApproval2() != null && requisition.getApproval1().isApproved() 
			     && requisition.getApproval2().isApproved())) {
			requisition.setStatus(APPROVED);
			positionService.createRequitionPosition(requisition);
			updateRequisition(requisition);
			return requisition.getRequisitionId() + REQUISITION_HAS_APPROVED_SUCCESSFULLY
					+ requisition.getNoOfPositions() + " Positions created successfully";
		} else {
			requisition.setStatus(PARTIALY_APPROVED);
			updateRequisition(requisition);
			try {
				jobRequisitionNotificationService.sendNotification(requisition);
			} catch (MessagingException e) {
				e.printStackTrace();
			}
			return requisition.getRequisitionId()+ REQUISITION_HAS_APPROVED_SUCCESSFULLY
					+ ", sent approve request notification to" + requisition.getApproval2().getName();
		}
	}

	@Override
	public Requisition retrieveRequisitionBasedOnId(String requisitionId) {
		return requisitionRepository
				.retrieveRequisitionBasedOnId(requisitionId);
	}

	@Override
	public void rejectRequisition(Requisition requisition) {
		requisition.setStatus(REJECTED);
		requisitionRepository.updateRequisition(requisition);
		try {
			jobRequisitionNotificationService.sendNotification(requisition);
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void cloneRequisition(Requisition requisition) {
		prepareRequisition(requisition);
	}

	@Override
	public List<Requisition> retrieveAllRequistions() {
		return requisitionRepository.retrieveAllRequisitions();
	}
}