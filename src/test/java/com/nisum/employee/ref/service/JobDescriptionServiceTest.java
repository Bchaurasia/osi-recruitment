package com.nisum.employee.ref.service;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Matchers.any;

import com.nisum.employee.ref.domain.JobDescription;
import com.nisum.employee.ref.repository.JobDescriptionRepository;

@RunWith(MockitoJUnitRunner.class)
public class JobDescriptionServiceTest {
private MockMvc mockMvc;
	
	@InjectMocks
	private JobDescriptionService jobDescriptionService;
	
	@Mock
	private JobDescriptionRepository jobDescriptionRepository;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(jobDescriptionService).build();
	}
	
	@Test
	public void shouldRetrieveJobDescriptions() throws Exception{
		jobDescriptionService.retrieveJobDescriptions();
		verify(jobDescriptionRepository,times(1)).retrieveJobDescriptions();
	}
	
	@Test
	public void shouldPrepareJobDescription() throws Exception{
		jobDescriptionService.prepareJobDescription(new JobDescription());
		verify(jobDescriptionRepository,times(1)).prepareJobDescriptions(any(JobDescription.class));
	}
	
	@Test
	public void shouldUpdateJobDescription() throws Exception{
		jobDescriptionService.updateJobDescription(new JobDescription());
		verify(jobDescriptionRepository,times(1)).updateJobDescriptions(any(JobDescription.class));
	}
	
	@Test
	public void shoulddeleteJobDescription() throws Exception{
		jobDescriptionService.deleteJobDescription(any(String.class));
		verify(jobDescriptionRepository,times(1)).removeJobDescriptions(any(String.class));
	}
	
	@Test
	public void shouldValidateJDName() throws Exception{
		jobDescriptionService.validateJDName(any(String.class));
		verify(jobDescriptionRepository,times(1)).getJDById(any(String.class));
	}
	
	@Test
	public void shouldRetrieveJobDescriptionsById() throws Exception{
		jobDescriptionService.retrieveJobDescriptionsById(any(String.class));
		verify(jobDescriptionRepository,times(1)).getJDById(any(String.class));
	}
	
}
