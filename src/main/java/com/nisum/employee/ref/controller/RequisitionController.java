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
import com.nisum.employee.ref.service.RequisitionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class RequisitionController {


	private static final String REQUISITION_HAS_BEEN_REJECTED_SUCCESSFULLY = " Requisition has been Rejected successfully\"}";

	private static final String MSG_START = "{\"msg\":\"";

	private static final String MSG_END ="\"}";
	
	@Autowired
	private RequisitionService requisitionService;

	@Autowired
	private JobRequisitionNotificationService jobRequisitionNotificationService;
	
	private RequisitionApproverDetails requisitionApproverDetails = new RequisitionApproverDetails();
	
	@Secured({"ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/requisition",method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createRequisition(@RequestBody Requisition requisition)  throws Exception {
		log.info("creating requisition");
		requisitionService.prepareRequisition(requisition);
		setRequisitionApprovalDetails(requisitionApproverDetails,requisition.getApproval1(),requisition);
		if(requisition.getApproval2() != null ) {
			setRequisitionApprovalDetails(requisitionApproverDetails, requisition.getApproval2(),requisition);
		}
		
		requisitionApproverDetails = jobRequisitionNotificationService.sendNotification(requisition);
		String message="Requisition created successfully and notification sent to "+ requisitionApproverDetails.getApproverName()+".";
		String jsonObj=MSG_START+ message+ MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
		
	}
	
	@Secured({"ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/cloneRequisition",method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> cloneRequisition(@RequestBody Requisition requisition)  throws Exception {

		requisitionService.prepareRequisition(requisition);
		requisitionApproverDetails = jobRequisitionNotificationService.sendNotification(requisition);
		String message="Requisition Cloned successfully and sent notification to "+ requisitionApproverDetails.getApproverName()+".";
		String jsonObj=MSG_START+ message+ MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
		
	}
	
	
	
	private void setRequisitionApprovalDetails(RequisitionApproverDetails requisitionApproverDetails, RequisitionUser re, Requisition requisition) {
		requisitionApproverDetails.setRequisitionManagerEmail(requisition.getRequisitionManager().getEmailId());
		requisitionApproverDetails.setRequisitionManagerName(requisition.getRequisitionManager().getName());
		requisitionApproverDetails.setJobRequisitionId(requisition.getRequisitionId());
		requisitionApproverDetails.setApproverEmailId(re.getEmailId());
		requisitionApproverDetails.setApproverName(re.getName());
	}
	
	@Secured({"ROLE_REQUISITION_APPROVER"})
	@ResponseBody
	@RequestMapping(value="/approveRequisition",method = RequestMethod.POST)
	public ResponseEntity<?> approveRequisition(@RequestBody Requisition requisition) throws Exception{
		log.info("approveing requisition");
		String jsonObj = MSG_START+ requisitionService.approveRequisition(requisition) + MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}
	
	@Secured({"ROLE_REQUISITION_APPROVER"})
	@ResponseBody
	@RequestMapping(value="/rejectRequisition",method = RequestMethod.POST)
	public ResponseEntity<?> rejectRequisition(@RequestBody Requisition requisition) throws Exception{
				requisitionService.rejectRequisition(requisition);
		return new ResponseEntity<String>(MSG_START+ requisition.getRequisitionId()+REQUISITION_HAS_BEEN_REJECTED_SUCCESSFULLY, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/requisition",method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<String> updateRequisition(@RequestBody Requisition requisition) throws Exception{
		log.info("Updating requisition");
		requisitionService.updateRequisition(requisition);
		setRequisitionApprovalDetails(requisitionApproverDetails,requisition.getApproval1(),requisition);
		if(requisition.getApproval2() != null) {
			setRequisitionApprovalDetails(requisitionApproverDetails, requisition.getApproval2(),requisition);
		}
		requisitionApproverDetails = jobRequisitionNotificationService.sendNotification(requisition);
		String message="Requisition successfully Updated and notification sent to "+ requisitionApproverDetails.getApproverName()+".";
		String jsonObj=MSG_START+ message+ MSG_END;
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
