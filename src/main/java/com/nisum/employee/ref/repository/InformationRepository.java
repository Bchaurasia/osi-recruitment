package com.nisum.employee.ref.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.InfoEntity;


@Repository
public class InformationRepository {
	
	@Autowired
	private MongoOperations mongoOperation;
	
	public void save(InfoEntity info) {
		mongoOperation.save(info);
	}

}
