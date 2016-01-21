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
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.Designation;
import com.nisum.employee.ref.service.IDesignationService;

@Component
@Controller
public class DesignationController {

	@Autowired
	private IDesignationService designationService;
	
	@RequestMapping(value="/design",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveDesignation() {
		
		ArrayList<Designation> designation = designationService.retrieveDesignations();
		
        return (null == designation) ? new ResponseEntity<String>("No Designation found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<Designation>>(designation, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/design", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> saveDesignation(@RequestBody Designation designation) throws Exception {
		designationService.prepareDesignation(designation);
		String jsonObj="{\"msg\":\"Created\"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/design", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> updateDesignation(@RequestBody Designation designation) throws Exception {
		designationService.updateDesignation(designation);
		String jsonObj="{\"msg\":\"Updated\"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/design/{designation}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteDesignation(@PathVariable("designation") String designation) throws Exception {
		designationService.deleteDesignation(designation);;
		String jsonObj="{\"msg\":\"Deleted\"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
	
}
