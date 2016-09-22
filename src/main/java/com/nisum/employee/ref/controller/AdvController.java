package com.nisum.employee.ref.controller;

import java.util.List;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.nisum.employee.ref.domain.Advertisement;
import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.service.IAdService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class AdvController {

	@Autowired
	private IAdService adService;
	
	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/uploadSliderImages", method = RequestMethod.POST)
	public ResponseEntity<String> uploadImage(HttpServletRequest request, Model model,
			@RequestParam(value = "file") MultipartFile multipartFile,
			@RequestParam(value = "imageName")String fileName
			) throws Exception {
		
        adService.uploadImage(fileName, multipartFile);
		return new ResponseEntity<String>("Image uploaded successfully", HttpStatus.OK);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/getSliderImages", method = RequestMethod.GET)
    public ResponseEntity<?> retrieveLatestSliderImages(){
		List<Advertisement> advDetails = adService.getImages();
		return new ResponseEntity<List<Advertisement>>(advDetails, HttpStatus.OK);
		
	}
}