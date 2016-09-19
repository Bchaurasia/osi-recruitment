package com.nisum.employee.ref.service;

import javax.servlet.annotation.MultipartConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import com.nisum.employee.ref.repository.AdRepository;

@MultipartConfig
public class AdService implements IAdService{
	
	@Autowired
	AdRepository adRepository;

	@Override
	public String uploadImage(String fileName,MultipartFile multipartFile) {
		// TODO Auto-generated method stub
		adRepository.uploadImageToCloud(fileName, multipartFile);
		return null;
	}
	
	
	
}