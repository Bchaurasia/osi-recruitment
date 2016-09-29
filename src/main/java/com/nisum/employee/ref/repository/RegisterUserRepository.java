package com.nisum.employee.ref.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.RegisterUser;
import com.nisum.employee.ref.domain.UserInfo;

@Repository
public class RegisterUserRepository {

	@Autowired
	private MongoOperations mongoOperations;
	@Autowired
	private SequenceRepository sequenceRepository;
	
	public void save(RegisterUser registerUser) {
		registerUser.setVersionId("SER_"+sequenceRepository.getNextSequenceId("SER"));
		mongoOperations.save(registerUser);
	}

	public RegisterUser getUserDetailsFromVersionId(String versionId) {
		RegisterUser registerUser = mongoOperations.findById(versionId, RegisterUser.class);
		return registerUser;
	}
	
	public boolean getUserDetailsByEmailId(String emailId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("emailId").is(emailId));
		return mongoOperations.exists(query, RegisterUser.class);
	}
	
	
	
}
