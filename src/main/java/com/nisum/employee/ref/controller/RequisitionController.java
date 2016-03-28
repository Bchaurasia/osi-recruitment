package com.nisum.employee.ref.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;
import com.nisum.employee.ref.domain.RequisitionUser;
import com.nisum.employee.ref.service.JobRequisitionNotificationService;
import com.nisum.employee.ref.service.PositionService;
import com.nisum.employee.ref.service.RequisitionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class RequisitionController {


	@Autowired
	private RequisitionService requisitionService;

	@Autowired
	private PositionService positionService;
	
	@Autowired
	private JobRequisitionNotificationService jobRequisitionNotificationService;
	
	private RequisitionApproverDetails requisitionApproverDetails = new RequisitionApproverDetails();
	
	@Secured({"ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/requisition",method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createRequisition(@RequestBody Requisition requisition)  throws Exception {
		log.info("creating new requisition");
		requisitionService.prepareRequisition(requisition);
		setRequisitionApprovalDetails(requisitionApproverDetails,requisition.getApproval1(),requisition.getRequisitionId());
		if(requisition.getApproval2() != null ) {
			setRequisitionApprovalDetails(requisitionApproverDetails, requisition.getApproval2(),requisition.getRequisitionId());
		}
		
		requisitionApproverDetails = jobRequisitionNotificationService.sendNotification(requisition);
		String message="Requisition created successfully and notification sent to "+ requisitionApproverDetails.getApproverName()+".";
		String jsonObj="{\"msg\":\""+ message+ "\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
		
	}

	private void setRequisitionApprovalDetails(RequisitionApproverDetails requisitionApproverDetails, RequisitionUser re, String id) {
		requisitionApproverDetails.setApproverEmailId(re.getEmailId());
		requisitionApproverDetails.setApproverName(re.getName());
		requisitionApproverDetails.setJobRequisitionId(id);
		
	}
	
	@Secured({"ROLE_ADMIN","ROLE_REQUISITION_APPROVER"})
	@ResponseBody
	@RequestMapping(value="/approveRequisition",method = RequestMethod.POST)
	public ResponseEntity<?> approveRequisition(@RequestBody Requisition requisition) throws Exception{
		log.info("creating new requisition");
		String jsonObj="";
		if(requisition.getApproval2() != null && requisition.getApproval1().isApproved() && requisition.getApproval2().isApproved()){
			positionService.createRequitionPosition(requisition);
			jsonObj="{\"msg\":\""+ requisition.getRequisitionId()+" Requisition has been approved and "+requisition.getNoOfPositions()+" Number Positions created successfully\"}";
		}else if(requisition.getApproval2() == null && requisition.getApproval1().isApproved() ){
			positionService.createRequitionPosition(requisition);
			jsonObj="{\"msg\":\""+ requisition.getRequisitionId()+" Requisition has been approved and "+requisition.getNoOfPositions()+" Number Positions created successfully\"}";
		}
		else{
			requisitionService.updateRequisition(requisition);
			requisitionApproverDetails = jobRequisitionNotificationService.sendNotification(requisition);
			jsonObj="{\"msg\":\""+ requisition.getRequisitionId()+" Requisition has been approved successfully\"}";
		}
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/requisition",method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<String> updateRequisition(@RequestBody Requisition requisition) throws Exception{
		log.info("Updating requisition");
		requisitionService.updateRequisition(requisition);
		setRequisitionApprovalDetails(requisitionApproverDetails,requisition.getApproval1(),requisition.getRequisitionId());
		if(requisition.getApproval2() != null) {
			setRequisitionApprovalDetails(requisitionApproverDetails, requisition.getApproval2(),requisition.getRequisitionId());
		}
		requisitionApproverDetails = jobRequisitionNotificationService.sendNotification(requisition);
		String message="Requisition successfully Updated and notification sent to "+ requisitionApproverDetails.getApproverName()+".";
		String jsonObj="{\"msg\":\""+ message+ "\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@ResponseBody
	@RequestMapping(value="/requisition",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveAllRequisitions() {
		List<Requisition> requisitionsDetails= requisitionService.retrieveAllRequistions();
		return (requisitionsDetails.isEmpty()) ? new ResponseEntity<String>("{\"msg\":\"Requisitions not found\"}", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}

	
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/requisitionById" , method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> retrieveRequisitionBasedOnId(@RequestParam(value = "requisitionId", required = true) String requisitionId) {
		if(!requisitionId.isEmpty()){
			Requisition requisitionsDetails= requisitionService.retrieveRequisitionBasedOnId(requisitionId);
			return (null == requisitionsDetails) ? new ResponseEntity<String>("{\"msg\":\"No requisition found based on requested requisitionId\"}", HttpStatus.NOT_FOUND)
					: new ResponseEntity<Requisition>(requisitionsDetails, HttpStatus.OK);
		} else{
			return new ResponseEntity<String>("{\"msg\":\"Requisition Id is empty\"}", HttpStatus.BAD_REQUEST);
		}
	}
}
