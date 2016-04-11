package com.nisum.employee.ref.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.JobDescription;
import com.nisum.employee.ref.service.IJobDescriptionService;

@Component
@Controller
public class JobDescriptionController {

	@Autowired
	private IJobDescriptionService jobDescriptionService;
	
	@RequestMapping(value="/jobDescription",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveJobDescription(@RequestParam(value = "id", required = false) String jdId) {
		ArrayList<JobDescription> jobDescription = null;
		if(jdId!= null && !jdId.isEmpty()){
			jobDescription = jobDescriptionService.retrieveJobDescriptionsById(jdId);
		}else{
			jobDescription = jobDescriptionService.retrieveJobDescriptions();
		}
        return new ResponseEntity <ArrayList<JobDescription>>(jobDescription, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/jobDescription", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> saveJobDescription(@RequestBody JobDescription jobDescription) throws Exception {
		jobDescriptionService.prepareJobDescription(jobDescription);
		String jsonObj="{\"msg\":\"Job Description has created successfully\"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/jobDescription", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> updateJobDescription(@RequestBody JobDescription jobDescription) throws Exception {
		jobDescriptionService.updateJobDescription(jobDescription);
		String jsonObj="{\"msg\":\"Job Description has Updated successfully\"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/jobDescription/{jobDescription}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteJobDescription(@PathVariable("jobDescription") String jobDescription) throws Exception {
		jobDescriptionService.deleteJobDescription(jobDescription);;
		String jsonObj="{\"msg\":\"Job Description has Deleted successfully \"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
	
	@RequestMapping(value="/validateJDName",method = RequestMethod.GET)
	public ResponseEntity<?> validateJDName(@RequestParam(value = "jdName", required = true) String jdName) {
		ArrayList<JobDescription> jobDescription = jobDescriptionService.validateJDName(jdName);
        return new ResponseEntity <ArrayList<JobDescription>>(jobDescription, HttpStatus.OK);
	}
	
	
}