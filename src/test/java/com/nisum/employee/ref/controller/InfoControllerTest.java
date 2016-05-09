package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
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

import com.nisum.employee.ref.domain.InfoEntity;
import com.nisum.employee.ref.service.IAppInfoService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class InfoControllerTest {
	
private MockMvc mockMvc;
	
	@InjectMocks
	InfoController infoController = new InfoController();
	
	@Mock
	private IAppInfoService infoService;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(infoController).build();
	}
	
	@Test
	public void shouldRetrieveInfo() throws Exception {
		List<InfoEntity> info = Lists.newArrayList(new InfoEntity());
		when(infoService.retrieveSkills()).thenReturn((ArrayList<InfoEntity>) info);
		mockMvc.perform(
				get("/info?userId")).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldNotRetrieveInfo() throws Exception {
		
		when(infoService.retrieveSkills()).thenReturn(null);
		mockMvc.perform(
				get("/info?userId").contentType(MediaType.APPLICATION_JSON).
				content("")).andExpect(status().isNotFound());
				
	}
	
	@Test
	public void shouldUpdateInfo() throws Exception {
		
		doNothing().when(infoService).updateInfo(any(InfoEntity.class));

		mockMvc.perform(
				put("/info").contentType(MediaType.APPLICATION_JSON).
				content(MockTestUtil.convertToJsonFormat(new InfoEntity()))).andExpect(status().isOk());

	}
	
	@Test
	public void shouldDeleteInfo() throws Exception {
		
		doNothing().when(infoService).updateDesigInfo(any(InfoEntity.class));

		mockMvc.perform(
				delete("/info").contentType(MediaType.APPLICATION_JSON).
				content(MockTestUtil.convertToJsonFormat(new InfoEntity()))).andExpect(status().isOk());

	}

}
