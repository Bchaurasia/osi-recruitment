package com.nisum.employee.ref.repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSInputFile;
import com.nisum.employee.ref.domain.Offer;
import com.nisum.employee.ref.domain.OfferDesignation;
import com.nisum.employee.ref.domain.OrgBandUpdateParams;
import com.nisum.employee.ref.domain.ordBands;



@Repository
public class OfferRepository {

	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private MongoDbFactory dbFactory;

	public void saveOffer(Offer offer) {
		mongoOperations.save(offer);
	}
	
	public Offer retrieveOfferDetails(String emailId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("emailId").regex(
				Pattern.compile(emailId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		Offer offerDetails = mongoOperations.findOne(query, Offer.class);
		return offerDetails;
	}
	public List<Offer> retrieveAllOfferDetails() {
		List<Offer> offerDetails = mongoOperations.findAll(Offer.class);
		return offerDetails;
	}
	public  List<ordBands> retrieveBandOfferDetails() {
	List<ordBands> bandList=mongoOperations.findAll(ordBands.class);
	return bandList;
	}
	
	public void updateDesignation(OrgBandUpdateParams ord){
		Query query = new Query();
		query.addCriteria(Criteria.where("BU").is(ord.getBu()).and("stream").is(ord.getSelectStream()).and("levels.level").is(ord.getSelectLevel()).and("levels.designations.grade").is(ord.getSelectGrade()));
		Update update = new Update();
		
		OfferDesignation designation = new OfferDesignation();
		designation.setGrade(ord.getSelectGrade());
		designation.setName(ord.getDesignation());
		update.push("levels.$.designations", designation);
		mongoOperations.upsert(query, update, ordBands.class);
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
