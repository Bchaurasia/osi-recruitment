package com.nisum.employee.ref.service;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.repository.ProfileRepository;
import com.nisum.employee.ref.search.InterviewSearchService;
import com.nisum.employee.ref.search.ProfileSearchService;

@RunWith(MockitoJUnitRunner.class)
public class ProfileServiceTest {
	
	@InjectMocks
	ProfileService profileService = new ProfileService();
	
	@Mock
	private ProfileRepository profileRepository;
	
	
	@Mock
	private ProfileSearchService profileSearchService;
	
	@Mock
	private InterviewSearchService interviewSearchService;
	
	@Mock
	private InterviewService interviewService;
	
	@Mock
	private NotificationService notificationService;
	
	@Test
	public void shouldPrepareCandidate() throws Exception {		
		
		Profile candidate = prepareCandidate();
		profileService.prepareCandidate(candidate);
		
		verify(profileRepository, times(1)).prepareCandidate(any(Profile.class));
	}
	
	@Test
	public void shouldUpdateCandidate() throws Exception {		
		
		Profile candidate = prepareCandidate();
		profileService.updateCandidate(candidate);
		
		verify(profileRepository, times(1)).updateCandidate(any(Profile.class));
	}
	
	@Test
	public void shouldUpdateCandidateStatus() throws Exception {		
		
		profileService.updateCandidateStatus(any(String.class),any(String.class));
		
		verify(profileRepository, times(1)).updateCandidateStatus(any(String.class),any(String.class));
	}
	
	@Test
	public void shouldGetProfileByEmailId() throws Exception {		
		
		profileService.getProfileByEmailId(any(String.class));
		
		verify(profileRepository, times(1)).retrieveCandidateDetails(any(String.class));
	}
	
	@Test
	public void shouldRetrieveProfileByJobCode() throws Exception {		
		
		profileService.retrieveProfileByJobCode(any(String.class));
		
		verify(profileRepository, times(1)).retrieveProfileByJobCode(any(String.class));
	}
	
	@Test
	public void shouldGetProfileByProfileCreatedId() throws Exception {		
		
		profileService.getProfileByProfileCreatedId(any(String.class));
		
		verify(profileRepository, times(1)).retrieveProfileByProfileCreatedBy(any(String.class));
	}
	
	@Test
	public void shouldRetrieveAllProfiles() throws Exception {		
		
		profileService.retrieveAllProfiles();
		
		verify(profileRepository, times(1)).retrieveAllProfiles();
	}
	
	@Test
	public void shouldDeleteProfileBasedOnEmailId() throws Exception {		
		
		profileService.deleteProfileBasedOnEmailId(any(String.class));
		
		verify(profileRepository, times(1)).deleteProfileBasedOnEmailId(any(String.class));
	}
	
	@Test
	public void shouldSaveResume() throws Exception {		
		MockMultipartFile firstFile = new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());
		profileService.saveResume(firstFile,"abc@abc.com");
		
		verify(profileRepository, times(1)).saveResumeInBucket(firstFile,"abc@abc.com");
	}
	
	@Test
	public void shouldGetResume() throws Exception {		
		
		profileService.getResume(any(String.class));
		
		verify(profileRepository, times(1)).getResume(any(String.class));
	}
	
	@Test
	public void shouldGetFileData() throws Exception {		
		
		profileService.getFileData(any(String.class));
		
		verify(profileRepository, times(1)).getData(any(String.class));
	}
	
	private Profile prepareCandidate(){
		Profile candidate = new Profile();
		ArrayList<String> skills = prepareSkills();
		
		candidate.setCandidateName("Abc");
		candidate.setEmailId("abc@abc.com");
		candidate.setPrimarySkills(skills);
		candidate.setDesignation("Dev");
		candidate.setHrAssigned("XYZ");
		candidate.setCreatedDate(new Date());
		
		return candidate;
		
	}

	private ArrayList<String> prepareSkills() {
		ArrayList <String> skills = new ArrayList<String>();
		skills.add("C");
		return skills;
	}
	
}
