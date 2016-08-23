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
import com.nisum.employee.ref.search.RequisitionSearchService;
import com.nisum.employee.ref.service.RequisitionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class RequisitionController {
	private static final String MSG_START = "{\"msg\":\"";
	private static final String MSG_END = "\"}";
	private static final String REQUISITION_HAS_BEEN_REJECTED_SUCCESSFULLY = " Requisition has been rejected successfully";

	@Autowired
	RequisitionService requisitionService;

	@Autowired
	RequisitionSearchService requisitionSearchService;

	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchRequisitionByText", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> searchRequisitionBasedOnId(
			@RequestParam(value = "searchRequisition", required = true) String searchRequisition) throws Exception {
		List<Requisition> requisitionsDetails = null;
		if (!searchRequisition.isEmpty()) {
			requisitionsDetails = requisitionSearchService.getRequisitionReqIdOrPositionOrClientByNameOrStatus(searchRequisition);
		} else {
			requisitionsDetails = requisitionSearchService.getAllRequisitionDetails();
		}
		return new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}

	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@ResponseBody
	@RequestMapping(value = "/requisition", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveAllRequisitions() {
		List<Requisition> requisitionsDetails = requisitionService.retrieveAllRequistions();
		return new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}
	
	

	@Secured({ "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisition", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createRequisition(@RequestBody Requisition requisition) throws Exception {
		requisitionService.prepareRequisition(requisition);
		String jsonObj = MSG_START + "Requisition created successfully and notification sent to "
				+ requisition.getApproval1().getName() + "." + MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisition", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<String> updateRequisition(@RequestBody Requisition requisition) throws Exception {
		log.info("Updating requisition");
		RequisitionApproverDetails requisitionApproverDetails = requisitionService.updateRequisition(requisition);
		String message = "Requisition updated successfully and notification sent to "
				+ requisitionApproverDetails.getApproverName() + ".";
		String jsonObj = "{\"msg\":\"" + message + "\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisitionById", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> retrieveRequisitionBasedOnId(
			@RequestParam(value = "requisitionId", required = true) String requisitionId) {
		Requisition requisitionsDetails = requisitionService.retrieveRequisitionBasedOnId(requisitionId);
		return  new ResponseEntity<Requisition>(requisitionsDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisitionByCreatedById", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> requisitionByCreatedById(
			@RequestParam(value = "createdById", required = true) String createdById) {
		List<Requisition> requisitionsDetails = requisitionSearchService.getRequisitionsBrcreatedById(createdById);
		return  new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_APPROVER" })
	@ResponseBody
	@RequestMapping(value = "/rejectRequisition", method = RequestMethod.POST)
	public ResponseEntity<?> rejectRequisition(@RequestBody Requisition requisition) throws Exception {
		requisitionService.rejectRequisition(requisition);
		String jsonObj = MSG_START + requisition.getRequisitionId() + REQUISITION_HAS_BEEN_REJECTED_SUCCESSFULLY
				+ MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/cloneRequisition", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> cloneRequisition(@RequestBody Requisition requisition) throws Exception {
		requisitionService.cloneRequisition(requisition);
		String message = "Requisition cloned successfully and sent notification to "
				+ requisition.getApproval1().getName() + ".";
		String jsonObj = MSG_START + message + MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_APPROVER" })
	@ResponseBody
	@RequestMapping(value = "/approveRequisition", method = RequestMethod.POST)
	public ResponseEntity<?> approveRequisition(@RequestBody Requisition requisition) throws Exception {
		log.info("Approving requisition");
		String message = requisitionService.approveRequisition(requisition);
		String jsonObj = MSG_START + message + " " + MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}
	
	@Secured({ "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/getRequisitionBasedOnApproverId", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getRequisitionBasedOnApproverId(
			@RequestParam(value = "emailId", required = true) String emailId) throws Exception {
		List<Requisition> requisitionsDetails = null;
			requisitionsDetails = requisitionSearchService.getRequisitionByApprover(emailId);
		return new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}
}