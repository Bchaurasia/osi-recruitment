package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;
import com.nisum.employee.ref.service.JobRequisitionNotificationService;

@Controller 
public class JobRequisitionController {

	@Autowired
	private JobRequisitionNotificationService jobRequisitionNotificationService;
	
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/approveJobRequisition", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createJobRequisitionNotification(@RequestBody RequisitionApproverDetails details) throws Exception {
		return new ResponseEntity<InterviewDetails>( HttpStatus.OK);
	}
	
}
