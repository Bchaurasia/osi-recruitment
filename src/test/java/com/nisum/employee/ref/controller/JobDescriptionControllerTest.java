package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.nisum.employee.ref.domain.JobDescription;
import com.nisum.employee.ref.service.JobDescriptionService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class JobDescriptionControllerTest {
private MockMvc mockMvc;
	
	@InjectMocks
	private JobDescriptionController jobDescriptionController;
	
	@Mock
	private JobDescriptionService jobDescriptionService;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(jobDescriptionController).build();
	}
	
	@Test
	public void shouldRetrieveJobDescription() throws Exception{
		List<JobDescription> jobDescriptions = Lists.newArrayList(new JobDescription());
		doReturn(jobDescriptions).when(jobDescriptionService).retrieveJobDescriptionsById(any(String.class));
		mockMvc.perform(get("/jobDescription?id="+(any(String.class)))).andExpect(status().isOk());
	}
	@Test
	public void shouldNotRetrieveJobDescription() throws Exception{
		List<JobDescription> jobDescriptions = Lists.newArrayList(new JobDescription());
		doReturn(jobDescriptions).when(jobDescriptionService).retrieveJobDescriptions();
		mockMvc.perform(get("/jobDescription")).andExpect(status().isOk());
	}
	
	@Test
	public void shouldsaveJobDescription() throws Exception{
		mockMvc.perform(
				post("/jobDescription")
				.content(MockTestUtil.convertToJsonFormat(new JobDescription()))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldUpdateJobDescription() throws Exception{
		mockMvc.perform(put("/jobDescription")
				.content(MockTestUtil.convertToJsonFormat(new JobDescription()))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}
	
	@Test
	public void shouldDeleteJobDescription() throws Exception{
		List<JobDescription> jobDescriptions = Lists.newArrayList(new JobDescription());
		mockMvc.perform(delete("/jobDescription/"+any(String.class))).andExpect(status().isOk());

	}
	@Test
	public void shouldValidateJDName() throws Exception
	{
		List<JobDescription> jobDescriptions = Lists.newArrayList(new JobDescription());
		doReturn(jobDescriptions).when(jobDescriptionService).validateJDName(any(String.class));
		mockMvc.perform(get("/validateJDName?jdName="+any(String.class))).andExpect(status().isOk());
	}
}
