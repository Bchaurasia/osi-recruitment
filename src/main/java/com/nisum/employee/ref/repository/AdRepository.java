package com.nisum.employee.ref.repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import com.nisum.employee.ref.domain.Advertisement;
import com.nisum.employee.ref.domain.Event;

@Repository
public class AdRepository{
	
	@Autowired
	private MongoOperations mongoOperations;
	
public String uploadImageToCloud(Advertisement adv,MultipartFile multipartFile){
	
	Cloudinary cloudinary = new Cloudinary();
	cloudinary = new Cloudinary( ObjectUtils.asMap("cloud_name", "dfle3ulxr",
			"api_key", "167436732849363", "api_secret", "p2bwKi7estuE78crJS2G2N6oPB8"));
	try {
		
		InputStream inputStream = multipartFile.getInputStream();
		Map resultMap  = cloudinary.uploader().uploadLargeRaw(inputStream, 
			    ObjectUtils.asMap("public_id", multipartFile.getOriginalFilename()));
		        adv.setUrl(resultMap.get("url").toString());
		        mongoOperations.save(adv);
		System.out.println(adv.getUrl());
		
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

	catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return adv.getUrl();
}
public List<Advertisement> retieveCurrentSliderImages(){	
	
	Query query = new Query();	
	query.with(new Sort(new Order(Sort.Direction.DESC, "createdDate")));
	query.limit(3);
	List<Advertisement> allImages=mongoOperations.find(query,Advertisement.class);
	return allImages;

	}

}