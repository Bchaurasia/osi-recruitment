package com.nisum.employee.ref.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nisum.employee.ref.repository.PositionRepository;
import com.nisum.employee.ref.repository.RequisitionRepository;
import com.nisum.employee.ref.search.PositionIndexRepository;
import com.nisum.employee.ref.search.RequisitionIndexRepository;
import com.nisum.employee.ref.search.RequisitionSearchService;
import com.nisum.employee.ref.service.DataSyncService;
import com.nisum.employee.ref.service.PositionService;

@Controller
public class DataSyncController {

	@Autowired
	DataSyncService dataSyncService;
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/updateDataIndex", method = RequestMethod.POST)
	public ResponseEntity<?> updateDataIndex() {
		List<String> operations = dataSyncService.updateDataIndex();
		return new ResponseEntity<List<String>>(operations, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/deleteDataIndex", method = RequestMethod.POST)
	public ResponseEntity<?> deleteDataIndex() {
		List<String> operations = dataSyncService.deleteDataIndex();
		return new ResponseEntity<List<String>>(operations, HttpStatus.OK);
		
	}
	
}
