package com.nisum.employee.ref.service;

import static org.mockito.Matchers.any;
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

import com.nisum.employee.ref.domain.Designation;
import com.nisum.employee.ref.repository.DesignationRepository;

@RunWith(MockitoJUnitRunner.class)
public class DesignationServiceTest {
	
private MockMvc mockMvc;
	
	@InjectMocks
    private DesignationService designationService;
	
	@Mock
	DesignationRepository designationRepository;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(designationService).build();
	}
	
	@Test
	public void shouldRetrieveDesignations() throws Exception{
		designationService.retrieveDesignations();
		verify(designationRepository,times(1)).retrieveDesignations();
	}
	
	@Test
	public void shouldPrepareDesignation() throws Exception{
		designationService.prepareDesignation(new Designation());
		verify(designationRepository,times(1)).prepareDesignations(any(Designation.class));
	}
	
	@Test
	public void shouldUpdateDesignation() throws Exception{
		designationService.updateDesignation(new Designation());
		verify(designationRepository,times(1)).updateDesignations(any(Designation.class));
	}
	
	@Test
	public void shouldDeleteDesignation() throws Exception{
		designationService.deleteDesignation(any(String.class));
		verify(designationRepository,times(1)).removeDesignations(any(String.class));
	}
}
