package com.nisum.employee.ref.controller;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

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
import com.nisum.employee.ref.domain.Series;
import com.nisum.employee.ref.search.PositionSearchService;
import com.nisum.employee.ref.service.IPositionService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class PositionController {

	@Autowired
	private IPositionService positionService;

	@Autowired
	private PositionSearchService positionSearchService;

	@Secured({ "ROLE_HR", "ROLE_ADMIN", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/position", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createPosition(@RequestBody Position position) {
		log.info("creating new position");
		positionService.preparePosition(position);
		return new ResponseEntity<Position>(position, HttpStatus.OK);
	}

	@Secured({ "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/position", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<String> updatePosition(@RequestBody Position position) {
		positionService.updatePosition(position);
		String jsonObj = "{\"msg\":\"position successfully Updated\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.ACCEPTED);
	}

	@Secured({ "ROLE_USER", "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/position", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionByClient(@RequestParam(value = "client", required = false) String client,
			@RequestParam(value = "designation", required = false) String designation) throws Exception {
		List<Position> positionsDetails;
		if (!StringUtils.isEmpty(client)) {
			positionsDetails = positionService.retrievePositionByClient(client);
		} else if (!StringUtils.isEmpty(designation)) {
			positionsDetails = positionService.retrievePositionsbasedOnDesignation(designation);
		} else {
			positionsDetails = positionService.retrieveAllPositions();
		}
		return new ResponseEntity<List<Position>>(positionsDetails, HttpStatus.OK);
	}

	@Secured({ "ROLE_USER", "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchPositionsBySearchQuery", method = RequestMethod.GET)
	public ResponseEntity<?> searchPositions(
			@RequestParam(value = "searchQuery", required = false) String searchQuery) {
		List<Position> positions = null;
		try {
			if (searchQuery != null && !searchQuery.isEmpty()) {
				// positions =
				// positionSearchService.getPostionByClient(searchQuery);
				positions = positionSearchService.getPostionByDesignationOrClient(searchQuery);
			} else {
				positions = positionSearchService.getAllPostions();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<List<Position>>(positions, HttpStatus.OK);
	}

	@Secured({"ROLE_USER", "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchPositionsBasedOnJobCode", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnJobCode(
			@RequestParam(value = "jobcode", required = true) String jobcode) {
		Position positionsDetail = positionService.retrievePositionsbasedOnJobCode(jobcode);
		return (null == positionsDetail) ? new ResponseEntity<String>("Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<Position>(positionsDetail, HttpStatus.OK);
	}

	@Secured({ "ROLE_USER", "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchPositionsBasedOnRequisitionId", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnRequisitionId(
			@RequestParam(value = "requisitionId", required = true) String requisitionId) {
		List<Position> positionsDetail = positionService.retrievePositionsbasedOnRequisitionId(requisitionId);
		return (null == positionsDetail) ? new ResponseEntity<String>("Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(positionsDetail, HttpStatus.OK);
	}

	@Secured({ "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchPositionBasedOnLocation", method = RequestMethod.GET)
	public ResponseEntity<?> retrievesearchPositionbasedOnLocation(
			@RequestParam(value = "location", required = true) String location,
			@RequestParam(value = "expYear", required = false) String expYear,
			@RequestParam(value = "primarySkills", required = false) String primarySkills) {
		List<Position> positionsDetail = positionService.retrievePositionbasedOnLocation(location);
		return (null == positionsDetail) ? new ResponseEntity<String>("Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(positionsDetail, HttpStatus.OK);
	}

	@Secured({ "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/getPositionsByAggregation", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveAllPositionsAggregate() {
		List<PositionAggregate> positionsDetail = positionService.retrieveAllPositionsAggregate();
		return (null == positionsDetail) ? new ResponseEntity<String>("Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<PositionAggregate>>(positionsDetail, HttpStatus.OK);
	}

	@Secured({ "ROLE_HR", "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchPositionsBasedOnPositionType", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnPositionType(
			@RequestParam(value = "positionType", required = true) String positionType) {
		List<Position> positionsDetail = positionService.retrievePositionsbasedOnPositionType(positionType);
		return new ResponseEntity<List<Position>>(positionsDetail, HttpStatus.OK);
	}

	
	//@Secured({ "ROLE_HR", "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
//	"ROLE_REQUISITION_APPROVER" })
@RequestMapping(value = "/getPositionsByDate", method = RequestMethod.GET)
public ResponseEntity<?> retrievePositionsByDates(@RequestParam Map<String,String> requestParams) {
		Date fromdate=null,todate=null;
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		List<Position> positionsDetails;
		try{
			fromdate=dateFormat.parse(requestParams.get("fromdate"));
			todate=dateFormat.parse(requestParams.get("todate"));
			
		}catch(ParseException e)
		{
			
		}
		Series.fromDate=fromdate;
		Series.toDate=todate;
		positionsDetails=positionSearchService.retrieveAllPositionsBySpecificDate();
		
		return new ResponseEntity<List<Position>>(positionsDetails, HttpStatus.OK);
	}
	
	// Dashboard
	@Secured({ "ROLE_HR", "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/getPositionsBasedOnStatus", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsByStatusforDashboard(@RequestParam Map<String,String> requestParams) {
		String status=requestParams.get("status");
		Date fromdate=null,todate=null;
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		try{
			fromdate=dateFormat.parse(requestParams.get("fromdate"));
			todate=dateFormat.parse(requestParams.get("todate"));
			
		}catch(ParseException e)
		{
			
		}
 
		Series series = new Series();
		Series.fromDate=fromdate;
		Series.toDate=todate;
		Series.LayerTwo layerTwoSeries=positionSearchService.setLayerTwoDataForDashboard(status);
		List<Series.LayerThree> layerThreeSeries=positionSearchService.setLayerThreeDataForDashboard(status);
		series.setLayer2(layerTwoSeries);
		series.setLayer3(layerThreeSeries);
		return new ResponseEntity<Series>(series, HttpStatus.OK);
	}
}
