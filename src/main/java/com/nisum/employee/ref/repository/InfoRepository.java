package com.nisum.employee.ref.repository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.InfoEntity;

@Repository
public class InfoRepository {

	@Autowired
	private MongoOperations mongoOperations;
	
	public ArrayList<InfoEntity> retrieveSkills() {
		  ArrayList<InfoEntity> skills = (ArrayList<InfoEntity>) mongoOperations.findAll(InfoEntity.class);
		  return skills;
	}
	
	public void prepareInfo(InfoEntity info) {
		mongoOperations.save(info);
	}
	
	public void updateInfo(InfoEntity info) {
		mongoOperations.save(info);
	}
}
