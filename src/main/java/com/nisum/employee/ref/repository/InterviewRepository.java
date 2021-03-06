package com.nisum.employee.ref.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.InterviewDetails;

@Repository
public class InterviewRepository {

	@Autowired
	private MongoOperations mongoOperation;

	public void save(InterviewDetails interview) {
		mongoOperation.save(interview);
	}

	public List<InterviewDetails> getAllInterviewDetails() {
		List<InterviewDetails> interviewDetails = mongoOperation.findAll(InterviewDetails.class);
		return interviewDetails;
	}
}
