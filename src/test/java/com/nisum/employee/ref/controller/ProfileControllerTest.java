package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.elasticsearch.common.collect.Lists;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.search.ProfileSearchService;
import com.nisum.employee.ref.service.IProfileService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class ProfileControllerTest {
	
	private MockMvc mockMvc;
	
	@InjectMocks
	ProfileController profileController = new ProfileController();
	
	@Mock
	private IProfileService profileService;
	
	@Mock
	private ProfileSearchService profileSearchService;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(profileController).build();
	}
	
	@Test
	public void shouldRetrieveProfileByEmailId() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileService).getProfileByEmailId(anyString());
		
		mockMvc.perform(get("/profile?emailId="+any(String.class))).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldRetrieveProfileByJobCode() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileService).getProfileByEmailId(anyString());
		
		mockMvc.perform(get("/profile?jobcodeProfile="+any(String.class))).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldRetrieveProfileByProfilecreatedBy() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileService).getProfileByProfileCreatedId(anyString());
		
		mockMvc.perform(get("/profile?profilecreatedBy="+any(String.class))).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldRetrieveAllProfiles() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileSearchService).getAllProfiles();
		
		mockMvc.perform(get("/profile").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldSearchProfileByEmailId() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileSearchService).getProfilesByProfilecreated(anyString());
		
		mockMvc.perform(get("/searchProfileByEmail")).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldSearchProfileToGetAllProfilesIfSearchQueryIsEmpty() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileSearchService).getAllProfiles();
		
		mockMvc.perform(get("/searchProfile?searchQuery="+"")).andExpect(status().isOk());
		
	}
		
	@Test
	public void shouldSearchToGetProfilesByEmailIdOrByNameOrByDesignation() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileSearchService).getProfilesByEmailIdOrByNameOrByDesignation(anyString());
		
		mockMvc.perform(get("/searchProfile?searchQuery="+any(String.class))).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldRegisterUser() throws Exception{
		Profile profile = new Profile();
		
		doReturn(profile).when(profileService).prepareCandidate(any(Profile.class));
		
		mockMvc.perform(
				post("/profile")
				.content(MockTestUtil.convertToJsonFormat(new Profile()))
				.contentType(MediaType.APPLICATION_JSON)
				).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldUpdateUser() throws Exception {
		
		doNothing().when(profileService).updateCandidate(any(Profile.class));
		
		mockMvc.perform(put("/profile")
				.content(MockTestUtil.convertToJsonFormat(new Profile()))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}
	
	@Test
	public void shouldUploadResume() throws Exception {
		
		 MockMultipartFile multipartFile = new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());
	       
	     mockMvc.perform(MockMvcRequestBuilders.fileUpload("/fileUpload?candidateId=abc@abc.com")
	                        .file("file", multipartFile.getBytes()))                                         
	                    .andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldUpdateProfileStatus() throws Exception {
		
		doNothing().when(profileService).updateCandidateStatus(anyString(),anyString());
		
		mockMvc.perform(post("/status?emailId="+any(String.class)+"&status="+any(String.class))).andExpect(status().isOk());
		
	}	
		
	@Test
	public void shouldGetProfileByReferralEmail() throws Exception {
		
		List<Profile> profile = Lists.newArrayList(new Profile());
		doReturn(profile).when(profileSearchService).getProfilesByRefreedBy(anyString());
		
		mockMvc.perform(get("/getProfileByReferralEmail?emailId="+any(String.class))).andExpect(status().isOk());
		
	}
	
	

}
