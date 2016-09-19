package com.nisum.employee.ref.service;

import org.springframework.web.multipart.MultipartFile;

public interface IAdService{
	String uploadImage(String fileName,MultipartFile multipartFile);
}