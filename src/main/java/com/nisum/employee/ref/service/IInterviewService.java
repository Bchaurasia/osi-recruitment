package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.InterviewDetails;

public interface IInterviewService {
	void prepareInterview(InterviewDetails interview);
	List<InterviewDetails> interviewCheck(String candidateId);
	
}
