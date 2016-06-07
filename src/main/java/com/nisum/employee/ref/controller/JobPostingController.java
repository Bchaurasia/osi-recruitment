package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.service.IPositionService;
import com.nisum.employee.ref.service.JobPostingService;

@Controller
public class JobPostingController {
	
	private static final String MSG_START = "{\"msg\":\"";
	private static final String MSG_END ="\"}";
	private static final String message = " has been published succesully";

	@Autowired(required=false)
	private JobPostingService jobPostingService;
	
	@Autowired
	private IPositionService  positionService;
	
	@RequestMapping(value = "/refralJobPublish", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> postReferalJob(@RequestBody Position position)throws Exception {
		jobPostingService.postReferalJob(position);
		String jsonObj=MSG_START+position.getJobcode()+message+ MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.ACCEPTED);
	}
	
}
