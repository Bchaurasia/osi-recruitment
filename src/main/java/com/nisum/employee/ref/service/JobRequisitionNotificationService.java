package com.nisum.employee.ref.service;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;

@Service 
public class JobRequisitionNotificationService {
	private static final String REJECTED = "REJECTED";
	@Autowired
	private NotificationService notificationService;
	
	public RequisitionApproverDetails sendNotification(Requisition details) throws AddressException, MessagingException {
		RequisitionApproverDetails requisitionApproverDetails = new RequisitionApproverDetails();
		
		requisitionApproverDetails.setRequisitionManagerEmail(details.getCreatedBy());
		requisitionApproverDetails.setJobRequisitionId(details.getRequisitionId());
		
		if(details.getComment() != null){
			requisitionApproverDetails.setComment(details.getComment());
		}
		
		if(details.getApproval1().isApproved() && details.getApproval2() != null){
			requisitionApproverDetails.setApproverEmailId(details.getApproval2().getEmailId());
			requisitionApproverDetails.setApproverName(details.getApproval2().getName());
			
		}else{
			requisitionApproverDetails.setApproverEmailId(details.getApproval1().getEmailId());
			requisitionApproverDetails.setApproverName(details.getApproval1().getName());
		}
		
		if(REJECTED.equals(details.getStatus())){
			notificationService.sendRejectRequisitionNotification(details,requisitionApproverDetails);
		}else {
			notificationService.sendJobRequisitionNotification(requisitionApproverDetails);
		}
		return requisitionApproverDetails;
	}
	
	public RequisitionApproverDetails sendNotificationForFullyApproved(Requisition details) throws AddressException, MessagingException {
		RequisitionApproverDetails requisitionFullyApproved = new RequisitionApproverDetails();
		
		if(details.getApproval1().isApproved() && details.getApproval2() != null){
			requisitionFullyApproved.setApproverName(details.getApproval2().getName());
		}else{
			requisitionFullyApproved.setApproverName(details.getApproval1().getName());
		}
		
		requisitionFullyApproved.setRequisitionManagerEmail(details.getCreatedBy());
		requisitionFullyApproved.setJobRequisitionId(details.getRequisitionId());		
			
		//requisitionFullyApproved.setHrEmailId(details.getRequisitionManager().getEmailId());
		
		requisitionFullyApproved.setPosition(details.getNoOfPositions());
	
		notificationService.sendJobRequisitionNotificationForFullyApproved(requisitionFullyApproved);
		
		return requisitionFullyApproved;
	}
	

}