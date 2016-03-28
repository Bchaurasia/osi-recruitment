package com.nisum.employee.ref.controller;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.search.InterviewSearchService;

@Controller
public class InterviewSearchController {

	@Autowired
	private InterviewSearchService  interviewSearchService;
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/interviewDetailsSearch", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveInterviewDetails(@RequestParam(value = "interviewDetails", required = false) String interviewDetails) throws Exception {
		List<InterviewDetails> positionsDetails;
		if(!StringUtils.isEmpty(interviewDetails)){
			positionsDetails = interviewSearchService.getInterviewDetailsByName(interviewDetails,interviewDetails);
		}else{
			positionsDetails = interviewSearchService.getAllInterviewDetails();
		}
		
		return ((null == positionsDetails)) ? (new ResponseEntity<String>( "Positions not found", HttpStatus.NOT_FOUND)) : (new ResponseEntity<List<InterviewDetails>>(positionsDetails, HttpStatus.OK));
	}
}
