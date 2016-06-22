package com.nisum.employee.ref.search;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nisum.employee.ref.domain.InterviewDetails;

public interface InterviewIndexRepository extends ElasticsearchRepository<InterviewDetails, String>{
	
	 List<InterviewDetails> findByJobCodeContainsOrCandidateNameStartingWithOrProgressStartingWithAllIgnoreCase(String jobCode, String candidateName, String progress);
	 List<InterviewDetails> findByInterviewerEmailStartingWith(String interviewerEmail);
}
