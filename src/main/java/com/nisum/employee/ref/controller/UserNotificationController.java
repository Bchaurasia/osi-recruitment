package com.nisum.employee.ref.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.nisum.employee.ref.domain.UserNotification;
import com.nisum.employee.ref.service.UserNotificationService;

@Controller
public class UserNotificationController {
	
	@Autowired
	UserNotificationService userNotificationService;
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/userNotification", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveNotification(@RequestParam(value = "userId", required = false) String userId) {
		List<UserNotification> userInfo  = userNotificationService.getUserNotifications(userId);
		return (null == userInfo) ? new ResponseEntity<String>( "Notifications not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<UserNotification>>(userInfo, HttpStatus.OK);
	}
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/userNotification", method = RequestMethod.POST)
	public ResponseEntity<?> readNotification(@RequestParam(value = "userId", required = false) String userId, @RequestParam(value = "message", required = false) String message) {
		userNotificationService.readNotification(userId, message);
		return new ResponseEntity<String>("Updated", HttpStatus.OK);
	}
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/noNotification", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveNoNotification(@RequestParam(value = "userId", required = false) String userId) {
		List<UserNotification> userInfo  = userNotificationService.getUserNoNotifications(userId);
		return (null == userInfo) ? new ResponseEntity<String>( "Notifications not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<UserNotification>>(userInfo, HttpStatus.OK);
	}
	
	@Secured({"ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/getNotificationCount", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveNotificationCount(@RequestParam(value = "userId", required = false) String userId) {
		long userInfo  = userNotificationService.getUserNotificationCount(userId);
		return new ResponseEntity<Long>(userInfo, HttpStatus.OK);
	}

}
