package com.nisum.employee.ref.search;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.InterviewDetails;

@Service
public class InterviewSearchService {
	

	@Autowired
	private InterviewIndexRepository interviewIndexRepository;
	
	public List<InterviewDetails> getAllInterviewDetails() throws Exception {
		Iterable<InterviewDetails> interviewDetails = interviewIndexRepository.findAll();
		List<InterviewDetails> interviewDetailsList = Lists.newArrayList(interviewDetails);
		return interviewDetailsList;
	}
	
	public List<InterviewDetails> getInterviewDetailsByName(String candidateName, String progress) throws Exception {
		List<InterviewDetails> interviewDetailsList = interviewIndexRepository.findByCandidateNameStartingWithOrProgressStartingWithAllIgnoreCase(candidateName, progress);
		return interviewDetailsList;
	}
	
	public InterviewDetails addInterviewDetailsIndex(InterviewDetails interviewDetails) throws Exception {
		InterviewDetails interviewDetailsData = interviewIndexRepository.save(interviewDetails);
		return interviewDetailsData;
	}
	
}
