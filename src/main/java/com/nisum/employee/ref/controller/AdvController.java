package com.nisum.employee.ref.controller;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import com.nisum.employee.ref.service.IAdService;


@Controller
public class AdvController {

	private IAdService adService;

/*//	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(value = "/uploadSliderImages", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> setSliderImage(HttpServletRequest request, Model model,
			@RequestParam(value = "imageName") String imageName,
			@RequestParam(value = "file", required = true) MultipartFile file) {
		adService.uploadImage(imageName, file);
		return null;

	}*/
	
	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/uploadSliderImages", method = RequestMethod.POST)
	public ResponseEntity<String> uploadResume(HttpServletRequest request, Model model,
			@RequestParam(value = "file") MultipartFile multipartFile,
			@RequestParam(value = "imageName") String imageName
			) throws Exception {
		System.out.println("multipartFile "+multipartFile);
        adService.uploadImage(imageName, multipartFile);
		return new ResponseEntity<String>("Image uploaded successfully", HttpStatus.OK);
	}
}