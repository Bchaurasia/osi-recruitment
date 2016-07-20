package com.nisum.employee.ref.controller;

import java.util.List;

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

import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.service.IEventService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class EventController {
	
	@Autowired
	private IEventService eventService;
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value="/notification", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createNotifications(@RequestBody Event event) {
		log.info("creating new notification");
		eventService.setEvent(event);
		
		
		return new ResponseEntity<Event>(event, HttpStatus.OK);
	}
	
	
	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@ResponseBody
	@RequestMapping(value = "/getNotification", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveAllRequisitions() {
		List<Event> eventDetails = eventService.getEvents();
		
		return new ResponseEntity<List<Event>>(eventDetails, HttpStatus.OK);
	}
}
