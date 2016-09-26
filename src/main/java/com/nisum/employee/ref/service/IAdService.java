package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.nisum.employee.ref.domain.Advertisement;

public interface IAdService{
	public void uploadImage(String fileName,MultipartFile multipartFile);
	public List<Advertisement> getImages() ;
}