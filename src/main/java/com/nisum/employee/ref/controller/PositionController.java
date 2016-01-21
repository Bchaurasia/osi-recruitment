package com.nisum.employee.ref.controller;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

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

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.PositionAggregate;
import com.nisum.employee.ref.service.PositionService;


@Slf4j
@Controller
public class PositionController {

	@Autowired
	private PositionService  positionService;
	
	@Secured({"ROLE_HR","ROLE_ADMIN"})
	@RequestMapping(value="/position", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createPosition(@RequestBody Position position) {
		log.info("creating new position");
		positionService.preparePosition(position);
		return new ResponseEntity<Position>(position, HttpStatus.OK);
	}

	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER"})
	@RequestMapping(value="/position", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<String> updatePosition(@RequestBody Position position) {
		positionService.updatePosition(position);
		String jsonObj="{\"msg\":\"position successfully Updated\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.ACCEPTED);
	}
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/position", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionByClient(@RequestParam(value = "client", required = false) String client,
			@RequestParam(value = "designation", required = false) String designation
			) {
		List<Position> positionsDetails;
		if(!StringUtils.isEmpty(designation)){
			positionsDetails = positionService.retrievePositionsbasedOnDesignation(designation);
		}else{
			positionsDetails = (!StringUtils.isEmpty(client)) ? positionService.retrievePositionByClient(client) : positionService.retrieveAllPositions();
		}
		
		return (null == positionsDetails) ? new ResponseEntity<String>( "Positions not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(positionsDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/searchPositionsBasedOnJobCode", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnJobCode(@RequestParam(value = "jobcode", required = true) String jobcode) {
		Position positionsDetail = positionService.retrievePositionsbasedOnJobCode(jobcode);
		return (null == positionsDetail) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<Position>(positionsDetail, HttpStatus.OK);
	} 
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/searchPositionBasedOnLocation", method = RequestMethod.GET)
	public ResponseEntity<?> retrievesearchPositionbasedOnLocation(@RequestParam(value = "location", required = true) String location,@RequestParam(value = "expYear", required = false) String expYear,@RequestParam(value = "primarySkills", required = false) String primarySkills) {
		List<Position> positionsDetail = positionService.retrievePositionbasedOnLocation(location);
		return (null == positionsDetail) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(positionsDetail, HttpStatus.OK);
	} 
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/getPositionsByAggregation", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveAllPositionsAggregate() {
		List<PositionAggregate> positionsDetail = positionService.retrieveAllPositionsAggregate();
		return (null == positionsDetail) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<PositionAggregate>>(positionsDetail, HttpStatus.OK);
	} 
}
