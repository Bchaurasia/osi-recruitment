package com.nisum.employee.ref.repository;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSInputFile;
import com.nisum.employee.ref.domain.Offer;

@Repository
public class OfferRepository {

	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private MongoDbFactory dbFactory;

	public void saveOffer(Offer offer) {
		mongoOperations.save(offer);
	}
	
	
	public void saveResumeInBucket(MultipartFile multipartFile, String candidateId){
		DBObject metaData = new BasicDBObject();
		metaData.put("candidateId", candidateId);
	    try {
	    	InputStream inputStream = multipartFile.getInputStream();
	    	GridFS gridFS = new GridFS(dbFactory.getDb(), "offerletter");
	    	GridFSInputFile gridFSInputFile = gridFS.createFile(inputStream);
	    	gridFSInputFile.setMetaData(metaData);
	    	gridFSInputFile.setFilename(multipartFile.getOriginalFilename());
	    	gridFSInputFile.setContentType(multipartFile.getContentType());
	        gridFSInputFile.saveChunks();
	        gridFSInputFile.save();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
}
