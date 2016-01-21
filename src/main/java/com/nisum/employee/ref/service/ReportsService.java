package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.domain.ReportsVO;
import com.nisum.employee.ref.repository.ProfileRepository;

@Service
public class ReportsService {
	
	ReportsVO reportsVO = new ReportsVO();
	
	@Autowired
	ProfileRepository profileRepository;
	@Autowired
	InterviewDetailsService interviewDetailsService;
	
	public ReportsVO getDataByJobCode(String jobcodeProfile) {
		List<Profile> profiles = profileRepository.retrieveProfileByJobCode(jobcodeProfile);
		List<InterviewDetails> interviewDetails = interviewDetailsService.getInterviewByJobCode(jobcodeProfile);
		reportsVO.setProfiles(profiles);
		reportsVO.setInterviewDetails(interviewDetails);
		return reportsVO;
	}
}
