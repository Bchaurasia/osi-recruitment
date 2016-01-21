package com.nisum.employee.ref.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.InfoEntity;
import com.nisum.employee.ref.service.IAppInfoService;

@Component
@Controller
public class InfoController {

	@Autowired
	private IAppInfoService infoService;
	
	@RequestMapping(value="/info",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveInfo() {
		
		ArrayList<InfoEntity> info = infoService.retrieveSkills();
		
        return (null == info) ? new ResponseEntity<String>("No infos found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<InfoEntity>>(info, HttpStatus.OK);
	}
	

	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/info", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> updateInfo(@RequestBody InfoEntity info) throws Exception {
		infoService.updateInfo(info);
		String jsonObj="{\"msg\":\"Updated\"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
	
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value="/info", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteInfo(@RequestBody InfoEntity info) throws Exception {
		infoService.updateDesigInfo(info);
		String jsonObj="{\"msg\":\"Updated\"}";
		return new ResponseEntity<String>(jsonObj,
				HttpStatus.OK);
	}
}
