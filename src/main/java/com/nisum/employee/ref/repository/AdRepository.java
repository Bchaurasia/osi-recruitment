package com.nisum.employee.ref.repository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;

@Repository
public class AdRepository{

public void uploadImageToCloud(String fileName,MultipartFile multipartFile){
	System.out.println(fileName+" "+multipartFile);
	Cloudinary cloudinary = new Cloudinary();
	cloudinary = new Cloudinary( ObjectUtils.asMap("cloud_name", "dfle3ulxr",
			"api_key", "167436732849363", "api_secret", "p2bwKi7estuE78crJS2G2N6oPB8"));
}

}