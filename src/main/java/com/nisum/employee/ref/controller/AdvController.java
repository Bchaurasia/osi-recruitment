package com.nisum.employee.ref.controller;

import javax.servlet.annotation.MultipartConfig;
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
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import com.nisum.employee.ref.service.IAdService;

@MultipartConfig(fileSizeThreshold=1024*1024*10,    // 10 MB
maxFileSize=1024*1024*50,          // 50 MB
maxRequestSize=1024*1024*100)      // 100 MB
@Controller
public class AdvController {

	private IAdService adService;

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(value = "/uploadSliderImages", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> setSliderImage(HttpServletRequest request, Model model,
			@RequestParam(value = "imageName") String imageName,
			@RequestParam(value = "fileName", required = false) MultipartFile file) {
		adService.uploadImage(imageName, file);
		return null;

	}
}