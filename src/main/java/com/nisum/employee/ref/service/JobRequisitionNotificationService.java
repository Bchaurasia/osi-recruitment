package com.nisum.employee.ref.service;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;

@Service 
public class JobRequisitionNotificationService {

	@Autowired
	private INotificationService notificationService;
	
	public RequisitionApproverDetails sendNotification(Requisition details) throws AddressException, MessagingException {
		RequisitionApproverDetails requisitionApproverDetails = new RequisitionApproverDetails();
		requisitionApproverDetails.setRequisitionManagerName(details.getRequisitionManager().getName());
		requisitionApproverDetails.setRequisitionManagerEmail(details.getRequisitionManager().getEmailId());
		requisitionApproverDetails.setJobRequisitionId(details.getRequisitionId());
		
		
		if(details.getApproval1().isApproved() && details.getApproval2() != null){
			requisitionApproverDetails.setApproverEmailId(details.getApproval2().getEmailId());
			requisitionApproverDetails.setApproverName(details.getApproval2().getName());
		}else{
			requisitionApproverDetails.setApproverEmailId(details.getApproval1().getEmailId());
			requisitionApproverDetails.setApproverName(details.getApproval1().getName());
		}
		notificationService.sendJobRequisitionNotification(requisitionApproverDetails);
		return requisitionApproverDetails;
	}
	
	public RequisitionApproverDetails sendRejectionNotification(Requisition details) throws AddressException, MessagingException {
		RequisitionApproverDetails requisitionApproverDetails = new RequisitionApproverDetails();
		requisitionApproverDetails.setRequisitionManagerName(details.getRequisitionManager().getName());
		requisitionApproverDetails.setRequisitionManagerEmail(details.getRequisitionManager().getEmailId());
		if(!details.getApproval1().isApproved()){
			requisitionApproverDetails.setApproverEmailId(details.getApproval2().getEmailId());
			requisitionApproverDetails.setApproverName(details.getApproval2().getName());
		}else{
			requisitionApproverDetails.setApproverEmailId(details.getApproval1().getEmailId());
			requisitionApproverDetails.setApproverName(details.getApproval1().getName());
		}
		return requisitionApproverDetails;
	}

}
