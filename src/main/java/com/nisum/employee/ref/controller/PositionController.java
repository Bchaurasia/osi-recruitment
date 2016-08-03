package com.nisum.employee.ref.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import com.google.gson.JsonObject;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.PositionAggregate;
import com.nisum.employee.ref.domain.Series;
import com.nisum.employee.ref.search.PositionSearchService;
import com.nisum.employee.ref.service.IPositionService;
import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

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

	@Secured({ "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchPositionsBasedOnJobCode", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnJobCode(
			@RequestParam(value = "jobcode", required = true) String jobcode) {
		Position positionsDetail = positionService.retrievePositionsbasedOnJobCode(jobcode);
		return (null == positionsDetail) ? new ResponseEntity<String>("Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<Position>(positionsDetail, HttpStatus.OK);
	}

	@Secured({ "ROLE_HR", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
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

	// Dashboard
	@Secured({ "ROLE_HR", "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_INTERVIEWER", "ROLE_REQUISITION_MANAGER",
			"ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/getPositionsBasedOnStatus", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsfordashboard(
			@RequestParam(value = "status", required = true) String status) {
		Series.LayerTwo series1 = new Series.LayerTwo();
		series1.setId(status);
		series1.setName(status);
		List<Position> positionsDetails = positionService.retrieveAllPositions();
		Series.LayerTwo.Data data = null;
		Set<Series.LayerTwo.Data> dataList = new HashSet<Series.LayerTwo.Data>();
		List<String> count = new ArrayList<String>();
		for (Position position : positionsDetails) {
			if (status.equals(position.getStatus())) {
				count.add(position.getDesignation());
			}

		}
		for (Position position : positionsDetails) {
			if (status.equals(position.getStatus())) {
				data = new Series.LayerTwo.Data();
				data.setY(Collections.frequency(count, position.getDesignation()));
				data.setName(position.getDesignation());
				data.setDrilldown(status + ":" + position.getDesignation());
				dataList.add(data);
			}

		}
		List<Series.LayerTwo.Data> list = new ArrayList<>(dataList);
		series1.setData(list);

		//////

		Set<String> uniqueDesigns = new HashSet<String>();
		for (Position position : positionsDetails) {
			uniqueDesigns.add(position.getDesignation());
		}

		Map<String, Integer> clients = null;
		Map<String,Map<String, Integer>> layerThreeData = new HashMap<String,Map<String, Integer>>();
		for (String uniqueDesign : uniqueDesigns) {
			clients = new HashMap<String, Integer>();
			List<String> ClientList = new ArrayList<String>();
			for (Position position : positionsDetails) {
				if (status.equals(position.getStatus()) && position.getDesignation().equals(uniqueDesign)) {
					ClientList.add(position.getClient());
				}
			}
			for (String client : ClientList) {
				Integer clientCount = clients.get(client);
				if (clientCount == null)
					clientCount = 0;
				clients.put(client, clientCount + 1);
			}
			layerThreeData.put(uniqueDesign, clients);
			System.err.println("list is "+layerThreeData); 
		}
		

		Series.LayerThree.Data data3 = null;
		Series.LayerThree series2  = new Series.LayerThree();
		for (Map.Entry<String,Map<String, Integer>> entry : layerThreeData.entrySet()) {
			
			series2.setId(entry.getKey());
		    for (Map.Entry<String, Integer> innerEntry : entry.getValue().entrySet()) {
		    	data3 = new Series.LayerThree.Data();
		    	data3.setClient(innerEntry.getKey());
		    	data3.setCount(innerEntry.getValue());
		    }
		    series2.getDataList().add(data3);
		}
		
		//////
		Series ser = new Series();
		ser.setLayer2(series1);
		ser.setLayer3(series2);
		

		return new ResponseEntity<Series>(ser, HttpStatus.OK);
	}
}
