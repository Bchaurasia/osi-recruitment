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
import com.nisum.employee.ref.service.ElasticsearchSearvice;


@Slf4j
@Controller
public class ElasticsearchController {

	@Autowired
	private ElasticsearchSearvice  elasticsearchSearvice;
	
	@Secured({"ROLE_HR","ROLE_ADMIN"})
	@RequestMapping(value="/positionSearch", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createPosition(@RequestBody Position position) {
		log.info("creating new position");
		elasticsearchSearvice.preparePosition(position);
		return new ResponseEntity<Position>(position, HttpStatus.OK);
	}

	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/positionSearch", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionByClient(@RequestParam(value = "client", required = false) String client,
			@RequestParam(value = "designation", required = false) String designation
			) {
		List<Position> positionsDetails;
		if(!StringUtils.isEmpty(client)){
			positionsDetails = elasticsearchSearvice.searchPositionByClient(client);
		}else{
			positionsDetails = elasticsearchSearvice.retrieveAllPositions();
		}
		
		return (null == positionsDetails) ? new ResponseEntity<String>( "Positions not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(positionsDetails, HttpStatus.OK);
	}
}
