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
	
public void uploadImageToCloud(Advertisement adv,MultipartFile multipartFile){
	
	Cloudinary cloudinary = new Cloudinary();
	cloudinary = new Cloudinary( ObjectUtils.asMap("cloud_name", "drozpmklt",
			"api_key", "422659358876324", "api_secret", "yNOYiU6GHFeUtkwucZaNGQXnWaw"));
	try {
		
		InputStream inputStream = multipartFile.getInputStream();
		Map resultMap  = cloudinary.uploader().uploadLargeRaw(inputStream, 
			    ObjectUtils.asMap("public_id", adv.getName()));
		        adv.setUrl(resultMap.get("url").toString());
		        mongoOperations.save(adv);
		
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

	catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

}
public List<Advertisement> retieveCurrentSliderImages(){	
	
	Query query = new Query();	
	query.with(new Sort(new Order(Sort.Direction.DESC, "createdDate")));
	query.limit(3);
	List<Advertisement> allImages=mongoOperations.find(query,Advertisement.class);
	return allImages;

	}

}