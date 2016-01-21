package com.nisum.employee.ref.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.ResponseVO;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody UserInfo userInfo) {
		userService.registerUserByEmailId(userInfo.getEmailId());
		return new ResponseEntity<String>("User registered Successfully", HttpStatus.OK);
	}

	@Secured({"ROLE_USER","ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> retrieveUsers(	@RequestParam(value = "emailId", required = false) String emailId, @RequestParam(value = "name", required = false) String name, @RequestParam(value = "clientName", required = false) String clientName) {
		List<UserInfo> userInfos = null;
		
		if(emailId != null){
			userInfos = userService.retrieveUserById(emailId);
		} else if (name != null) {
			userInfos = userService.retrieveUserByName(name);
		} else  if(clientName != null){
			userInfos = userService.retrieveUserByClient(clientName);
		} else {
			 userInfos  = userService.retrieveUser();
		}
		
		return (null == userInfos) ? new ResponseEntity<String>(
				"User with given argument is not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<UserInfo>>(userInfos, HttpStatus.OK);
	}
	
	@Secured({"ROLE_USER","ROLE_HR","ROLE_ADMIN","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> updateUser(@RequestBody UserInfo user) {
		userService.updateUser(user);
		ResponseVO<UserInfo> response = new ResponseVO<UserInfo>();
		response.setDate(new Date());
		response.setData(user);
		response.setHttpStatus(200);
		response.setMessage("User Updated succesfully.");
		
		return new ResponseEntity<ResponseVO<UserInfo>>(response, HttpStatus.OK);
	}
}
