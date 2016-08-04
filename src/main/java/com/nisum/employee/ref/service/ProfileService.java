package com.nisum.employee.ref.service;

import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.gridfs.GridFSDBFile;
import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.repository.InterviewDetailsRepository;
import com.nisum.employee.ref.repository.ProfileRepository;
import com.nisum.employee.ref.search.InterviewSearchService;
import com.nisum.employee.ref.search.ProfileSearchService;

@Service
public class ProfileService implements IProfileService{

	@Autowired
	ProfileRepository profileRepository;
	
	@Autowired
	ProfileSearchService profileSearchService;
	
	@Autowired
	InterviewSearchService interviewSearchService;
	
	@Autowired
	InterviewService interviewService;
	
	@Autowired
	InterviewDetailsRepository interviewDetailsRepository;
	
	@Autowired
	private NotificationService notificationService;
	
	public Profile prepareCandidate(Profile candidate) throws Exception {
		candidate.setIsApprovedFlag(false);
		profileRepository.prepareCandidate(candidate);
		try{
			notificationService.sendProfileCreatedNotification(candidate);
		}catch (MessagingException e) {
				e.printStackTrace();
		}
		if(!candidate.getIsReferral()) {
			InterviewDetails interview = prepareInterviewDetails(candidate);
			interviewService.prepareInterview(interview);
		}
		return profileSearchService.addProfileIndex(candidate);
	}
	
	public void approveCandidate(Profile candidate) {
		candidate.setIsApprovedFlag(true);
		profileRepository.prepareCandidate(candidate);	
		try {
			profileSearchService.updateProfileIndex(candidate);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try{
			notificationService.sendProfileApprovedNotification(candidate);
		}catch (MessagingException e) {
				e.printStackTrace();
		}
		InterviewDetails interview = prepareInterviewDetails(candidate);
		interviewService.prepareInterview(interview);
		
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
		if(candidate.getIsReferral()) {
			interview.setRequisitionId(candidate.getRequisitionId());
			interview.setJobCode(candidate.getJobCode());
			interview.setIsReferral(true);
		}	
		else {
			interview.setIsReferral(false);
		}
		return interview;
	}
	
	public void updateCandidate(Profile candidate) {
		try {
			candidate.setUpdatedDate(new Date());
			profileRepository.updateCandidate(candidate);
			profileSearchService.updateProfileIndex(candidate);
			try{
				notificationService.sendProfileUpdatedNotification(candidate);
			}catch (MessagingException e) {
					e.printStackTrace();
			}
			
			/*if(!candidate.getIsReferral()) {
				InterviewDetails interview = interviewDetailsRepository.getInterviewDetailsById(candidate.getEmailId());
				interview.setIsUpdatedFromProfile(true);
				interview.setRequisitionId(candidate.getRequisitionId());
				interview.setJobCode(candidate.getJobCode());				
			
				interviewDetailsRepository.updateinterviewDetails(interview);
			}*/
			
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
	
	public Profile getCandidateByEmailId(String emailId) {
		return profileRepository.getCandidate(emailId);
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