package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.gridfs.GridFSDBFile;
import com.nisum.employee.ref.domain.Profile;
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
	
	public Profile prepareCandidate(Profile candidate) throws Exception {
		profileRepository.prepareCandidate(candidate);
		return profileSearchService.addProfileIndex(candidate);
	}
	
	public void updateCandidate(Profile candidate) {
		try {
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