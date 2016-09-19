package com.nisum.employee.ref.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.nisum.employee.ref.repository.AdRepository;
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