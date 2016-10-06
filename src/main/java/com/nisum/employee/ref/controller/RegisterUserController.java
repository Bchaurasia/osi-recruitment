package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.nisum.employee.ref.domain.RegisterUser;
import com.nisum.employee.ref.service.RegisterUserService;

@Controller
@RequestMapping(value = "/register")
public class RegisterUserController {
	
	@Autowired
	RegisterUserService registerUserService;
	
	@RequestMapping(value = "/send-mail",method = RequestMethod.POST)
	public ResponseEntity<?> sendMailToUser(@RequestBody RegisterUser registerUser) throws Exception {
		registerUserService.sendMailToUser(registerUser);
		String jsonObj = "{\"msg\":\"Email verification link has been sent to registered email id\"}";
		return new ResponseEntity<String>(jsonObj,HttpStatus.OK);

	}
	@RequestMapping(value = "/verify-user", method = RequestMethod.GET)
	public ResponseEntity<?> verifyUser(@RequestParam(value = "versionId", required = false) String versionId) throws Exception {
		RegisterUser registerUser = registerUserService.getUserDetailsFromVersionId(versionId);
		registerUserService.saveInUserInfo(registerUser);
		String jsonObj = "{\"msg\":\"User has been registered successfully\"}";
		return new ResponseEntity<String>(jsonObj,HttpStatus.OK);

	}
	
	@RequestMapping(value = "/is-registered-user", method = RequestMethod.GET)
	public ResponseEntity<Boolean> isRegisteredUser(@RequestParam(value="emailId", required=true) String emailId) {
		return new ResponseEntity<Boolean>(registerUserService.isUserAlradyExist(emailId),HttpStatus.OK);
	}
}