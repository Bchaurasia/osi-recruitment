package com.nisum.employee.ref.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.InterviewFeedback;
import com.nisum.employee.ref.domain.InterviewSchedule;
import com.nisum.employee.ref.search.InterviewSearchService;
import com.nisum.employee.ref.service.InterviewDetailsService;

@Controller
public class InterviewController {
	
	private static final String MSG_START = "{\"msg\":\"";
	private static final String MSG_END = "\"}";
	
	@Autowired
	private InterviewDetailsService interviewDetailsService;
	
	@Autowired
	InterviewSearchService interviewSearchService;
	
	
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/searchInterviewDetails", method = RequestMethod.GET)
	public ResponseEntity<?> searchInterviews(@RequestParam(value = "interviewerQuery", required = false) String interviewerQuery) {
		List<InterviewDetails> interviewDetails = null;
		if(interviewerQuery != null && !interviewerQuery.isEmpty()){
			//interviewDetails =interviewDetailsService.getInterviewByCandidateId(interviewerQuery);
			interviewDetails=interviewSearchService.getInterviewDetailsByNameAndStatus(interviewerQuery,interviewerQuery, interviewerQuery,interviewerQuery,interviewerQuery);
		}else{
			//interviewDetails =interviewDetailsService.getAll();
			interviewDetails=interviewSearchService.getAllInterviewDetails();
		}
		return  new ResponseEntity<List<InterviewDetails>>(interviewDetails, HttpStatus.OK);
	}
	@RequestMapping(value = "/allInterviewDetails", method = RequestMethod.GET)
	public ResponseEntity<?> searchAllInterviews() {
		List<InterviewDetails> interviewDetails = null;
			//interviewDetails =interviewDetailsService.getAll();
			interviewDetails=interviewDetailsService.getAll();
		
		return  new ResponseEntity<List<InterviewDetails>>(interviewDetails, HttpStatus.OK);
	}
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/searchInterviewDetailsByInterviewId", method = RequestMethod.GET)
	public ResponseEntity<?> searchInterviewsByInterviewer(@RequestParam(value = "interviewerId", required = false) String interviewerId) {
		List<InterviewDetails> interviewDetails = null;
		interviewDetails=interviewSearchService.getInterviewByInterviewer(interviewerId);
		return  new ResponseEntity<List<InterviewDetails>>(interviewDetails, HttpStatus.OK);
	}
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/getInterviewDetailsById", method = RequestMethod.GET)
	public ResponseEntity<?> getInterview(@RequestParam(value = "interviewId", required = true) String interviewerId) {
		InterviewDetails checkDetails = interviewDetailsService.getInterview(interviewerId);
		return new ResponseEntity<InterviewDetails>(checkDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/getInterviewByInterviewer", method = RequestMethod.GET)
	public ResponseEntity<?> getInterviewByInterviewer(@RequestParam(value = "interviewerEmail", required = false) String interviewerEmail) {
		List<InterviewDetails> checkDetails = null;
		//checkDetails=interviewSearchService.getInterviewByInterviewer(interviewerEmail);
		checkDetails = interviewDetailsService.getInterviewByInterviewer(interviewerEmail);
		return new ResponseEntity<List<InterviewDetails>>(checkDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/getInterviewByJobCode", method = RequestMethod.GET)
	public ResponseEntity<?> getInterviewByJobCode(@RequestParam(value = "jobCode", required = false) String jobCode) {
		List<InterviewDetails> checkDetails = null;
			checkDetails = interviewDetailsService.getInterviewByInterviewerAndJobCode(jobCode);
		return  new ResponseEntity<List<InterviewDetails>>(checkDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/interviewSchedule", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createInterviewSchedule(@RequestBody InterviewSchedule interviewSchedule) throws Exception {
		InterviewDetails interviewSchedule2 = interviewDetailsService.scheduleInterview(interviewSchedule);
		return new ResponseEntity<InterviewDetails>(interviewSchedule2, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/interviewRe-Schedule", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> reScheduleInterviewSchedule(@RequestBody InterviewSchedule interviewSchedule) throws Exception {
		InterviewDetails interviewSchedule2 = interviewDetailsService.scheduleInterview1(interviewSchedule);
		return new ResponseEntity<InterviewDetails>(interviewSchedule2, HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/interviewFeedback", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> saveFeedback(@RequestBody InterviewFeedback interviewFeedback) throws Exception {
		try {
			interviewDetailsService.saveFeedback(interviewFeedback);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<InterviewFeedback>(interviewFeedback, HttpStatus.OK);
	}
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/createInterview", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createInterviewDetails(@RequestBody InterviewDetails interviewDetails) {
		try {
			interviewDetailsService.createInterview(interviewDetails);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<InterviewDetails>(interviewDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/getInterviewByParam", method = RequestMethod.GET)
	public ResponseEntity<?> getInterview(@RequestParam(value = "jobCode", required = false) String jobCode,@RequestParam(value = "candiateId", required = false) String candiateId, @RequestParam(value = "client", required = false) String client, @RequestParam(value = "progress", required = false) String progress, @RequestParam(value = "skill", required = false) String skill, @RequestParam(value = "designation", required = false) String designation, @RequestParam(value = "interviewId", required = false) String interviewId) {
		List<InterviewDetails> checkDetails = null;
		if(!StringUtils.isEmpty(jobCode)){
			checkDetails = interviewDetailsService.getInterviewByJobCode(jobCode);
		}else if (!StringUtils.isEmpty(candiateId)) {
			checkDetails = interviewDetailsService.getInterviewByCandidateId(candiateId);
		}else if (!StringUtils.isEmpty(client)) {
			checkDetails = interviewDetailsService.getInterviewByClient(client);
		}else if (!StringUtils.isEmpty(progress)) {
			checkDetails = interviewDetailsService.getInterviewByProgress(progress);
		}else if (!StringUtils.isEmpty(skill)) {
			checkDetails = interviewDetailsService.getInterviewBySkill(skill);
		}else if (!StringUtils.isEmpty(designation)) {
			checkDetails = interviewDetailsService.getInterviewByDesignation(designation);
		}else if (!StringUtils.isEmpty(interviewId)) {
			checkDetails = interviewDetailsService.getInterviewByinterviewId(interviewId);
		}else {
			checkDetails = interviewDetailsService.getAll();
		}
		return (null == checkDetails) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<InterviewDetails>>(checkDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/interview", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> updateIntewrviewDetails(@RequestBody InterviewDetails interviewDetails) {
		interviewDetailsService.updateInterviewDetails(interviewDetails);
		String successmessage = "{\"msg\":\"Profile successfully Updated\"}";
		return (null == successmessage) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<String>(successmessage, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/cancelInterview", method = RequestMethod.POST)
	public ResponseEntity<?> cancelInterviewSchedule(@RequestParam(value = "interviewId", required = true) String interviewId,@RequestParam(value = "roundName", required = true) String roundName,@RequestParam(value = "candidateName", required = true) String candidateName) throws Exception {
		interviewDetailsService.cancelInterviewSchedule(interviewId,roundName);
		String jsonObj = MSG_START + roundName +" for " + candidateName +" cancelled successfully."+ MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

}
