package com.nisum.employee.ref.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.nisum.employee.ref.domain.ReportsVO;
import com.nisum.employee.ref.service.ReportsService;

@RequestMapping("/reports")
@Controller
public class ReportsController {
	
	@Autowired
	private ReportsService reportsService;
	
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ResponseEntity<?> getData(@RequestParam(value = "jobcodeProfile", required = true) String jobcodeProfile) {
		ReportsVO profileDetails = reportsService.getDataByJobCode(jobcodeProfile);
		return (null == profileDetails) ? new ResponseEntity<String>("profiles are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<ReportsVO>(profileDetails, HttpStatus.OK);
	}
}
