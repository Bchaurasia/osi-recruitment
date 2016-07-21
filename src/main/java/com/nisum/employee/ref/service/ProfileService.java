package com.nisum.employee.ref.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.gridfs.GridFSDBFile;
import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.repository.ProfileRepository;
import com.nisum.employee.ref.repository.UserInfoRepository;
import com.nisum.employee.ref.search.InterviewSearchService;
import com.nisum.employee.ref.search.ProfileSearchService;

@Service
public class ProfileService implements IProfileService{

	@Autowired
	ProfileRepository profileRepository;
	
	@Autowired
	UserInfoRepository userInfoRepository;
	
	@Autowired
	ProfileSearchService profileSearchService;
	
	@Autowired
	InterviewSearchService interviewSearchService;
	
	@Autowired
	InterviewService interviewService;
	
	@Autowired
	IEventService eventService;
	
	public Profile prepareCandidate(Profile candidate) throws Exception {
		Event e=new Event();
		e.setEventDesc("Profile of "+candidate.getCandidateName()+" has created");
		e.setCategory("General");
//		e.setUsername(candidate.getCreatedBy());
		e.setEmailId(candidate.getCreatedBy());
		eventService.setEvent(e);
		//System.out.println(e.getEventDesc());
		profileRepository.prepareCandidate(candidate);
		InterviewDetails interview = prepareInterviewDetails(candidate);
		interviewService.prepareInterview(interview);
		
		//System.out.println("profile creation called");
		
		return profileSearchService.addProfileIndex(candidate);
		 
	}

	private InterviewDetails prepareInterviewDetails(Profile candidate) {
		InterviewDetails interview = new InterviewDetails();
		interview.setCandidateName(candidate.getCandidateName());
		interview.setCandidateEmail(candidate.getEmailId());
		interview.setCandidateSkills(candidate.getPrimarySkills());
		interview.setDesignation(candidate.getDesignation());
		interview.setHrAssigned(candidate.getHrAssigned());
		interview.setProgress("Not Initialized");
		interview.setInterviewerId(candidate.getEmailId()+"_"+(int)(Math.random() * 5000 + 1));
		return interview;
	}
	
	public void updateCandidate(Profile candidate) {
		try {
			candidate.setUpdatedDate(new Date());
			profileRepository.updateCandidate(candidate);
			profileSearchService.updateProfileIndex(candidate);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void updateCandidateStatus(String email,String status){
		profileRepository.updateCandidateStatus(email, status);
	}
	
	public List<Profile> getProfileByEmailId(String emailId) {
		return profileRepository.retrieveCandidateDetails(emailId);
	}
	
	public List<Profile> retrieveProfileByJobCode(String jobcodeProfile) {
		return profileRepository.retrieveProfileByJobCode(jobcodeProfile);
	}
	
	public List<Profile> getProfileByProfileCreatedId(String profilecreatedBy) {
		return profileRepository.retrieveProfileByProfileCreatedBy(profilecreatedBy);
	}
	
	public List<Profile> retrieveAllProfiles() {
		return profileRepository.retrieveAllProfiles();
	}
	
	public Profile deleteProfileBasedOnEmailId(String emailId) {
		return profileRepository.deleteProfileBasedOnEmailId(emailId);
	}
	
	public void saveResume(MultipartFile multipartFile, String candidateId) {
		profileRepository.saveResumeInBucket(multipartFile, candidateId);
	}
	
	public String[] getResume(String emailId) throws Exception {
		return profileRepository.getResume(emailId);
	}
	
	
	public List<GridFSDBFile> getFileData(String emailId) throws Exception {
		
		return profileRepository.getData( emailId);
	}
	
	
}