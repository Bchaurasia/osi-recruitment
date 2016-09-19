package com.nisum.employee.ref.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.nisum.employee.ref.service.IAdService;

@Controller
public class AdvController{
	
	
	private IAdService adService;
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/uploadSliderImages", method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> setSliderImage(HttpServletRequest request, Model model,@RequestParam(value="imageName") String imageName,
			@RequestParam(value = "file", required = true) MultipartFile file 
			){
		adService.uploadImage(imageName, file);
		return null;
		
	}
}