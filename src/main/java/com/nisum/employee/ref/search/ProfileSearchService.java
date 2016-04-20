package com.nisum.employee.ref.search;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.Profile;

@Service
public class ProfileSearchService {
	

	@Autowired
	private ProfileIndexRepository profileIndexRepository;
	
	public List<Profile> getAllProfiles() throws Exception {
		Iterable<Profile> profile = profileIndexRepository.findAll();
		List<Profile> porofileList = Lists.newArrayList(profile);
		try{
		Collections.sort(porofileList,new Comparator<Profile>(){
            public int compare(Profile o1, Profile o2){
            	return o2.getUpdatedDate().compareTo(o1.getUpdatedDate());
            }});
		}catch(Exception e){
			e.printStackTrace();
		}
		return porofileList;
	}
	
	public List<Profile> getProfilesByEmailIdOrByNameOrByDesignation(String emailId, String name, String designation) throws Exception {
		List<Profile> profilesList = profileIndexRepository.findProfilesByEmailIdStartingWithOrCandidateNameStartingWithOrDesignationStartingWithAllIgnoreCase(emailId,name,designation);
//		Collections.sort(profilesList,new Comparator<Profile>(){
//            public int compare(Profile o1, Profile o2){
//            	return o2.getUpdatedDate().compareTo(o1.getUpdatedDate());
//            }});
		return profilesList;
	}
	
	public Profile addProfileIndex(Profile profile) throws Exception {
		Profile profileData = profileIndexRepository.save(profile);
		return profileData;
	}

	public void updateProfileIndex(Profile profile) throws Exception {
		if(profileIndexRepository.exists(profile.getEmailId())){
		profileIndexRepository.delete(profile.getEmailId());
		addProfileIndex(profile);
		}else{
			addProfileIndex(profile);
		}
	}
	
	
	public List<Profile> getProfilesByEmailId(String emailId){
	List<Profile> profilesList = profileIndexRepository.findProfilesByEmailIdStartingWithAllIgnoreCase(emailId);
	return profilesList;
	}
	
	
	public List<Profile> getProfilesByJobcodeProfile(String jobcodeProfile) {
		List<Profile> profilesList = profileIndexRepository.findProfilesByJobcodeProfileStartingWithAllIgnoreCase(jobcodeProfile);
		return profilesList;
	}
	
	
	public List<Profile> getProfilesByProfilecreated(String profilecreatedBy){
		List<Profile> profilesList = profileIndexRepository.findProfilesByCreatedByStartingWithAllIgnoreCase(profilecreatedBy);
		return profilesList;
		}
	
}
