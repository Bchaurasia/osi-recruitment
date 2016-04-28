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

import com.nisum.employee.ref.domain.Designation;
import com.nisum.employee.ref.service.IDesignationService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class DesignationControllerTest {
private MockMvc mockMvc;
	
	@InjectMocks
	private DesignationController designationController;
	
	@Mock
	private IDesignationService designationService;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(designationController).build();
	}
	
	@Test
	public void shouldRetrieveDesignation() throws Exception{
		List<Designation> designation = Lists.newArrayList(new Designation());
		doReturn(designation).when(designationService).retrieveDesignations();
		mockMvc.perform(get("/design")).andExpect(status().isOk());
	}
	
	@Test
	public void shouldNotRetrieveDesignation() throws Exception{
		List<Designation> designation = Lists.newArrayList(new Designation());
		doReturn(null).when(designationService).retrieveDesignations();
		mockMvc.perform(get("/design")).andExpect(status().isNotFound());
	}
	
	@Test
	public void shouldSaveDesignation() throws Exception{
		mockMvc.perform(
				post("/design")
				.content(MockTestUtil.convertToJsonFormat(new Designation()))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldUpdateDesignation() throws Exception{
		mockMvc.perform(put("/design")
				.content(MockTestUtil.convertToJsonFormat(new Designation()))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}
	
	@Test
	public void shouldDeleteDesignation() throws Exception{
		List<Designation> designation = Lists.newArrayList(new Designation());
		mockMvc.perform(delete("/design/"+any(String.class))).andExpect(status().isOk());

	}
}
