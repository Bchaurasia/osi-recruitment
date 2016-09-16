package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class SliderImageController{
	
	@Autowired
	private IImageService imageService;
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/uploadSliderImages", method = RequestMethod.POST)
	public ResponseEntity<?> setSliderImage@RequestParam("imageArray") MultipartFile[] images){
		
	}
}