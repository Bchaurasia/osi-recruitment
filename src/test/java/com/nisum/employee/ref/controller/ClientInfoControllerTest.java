package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
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

import com.nisum.employee.ref.domain.ClientInfo;
import com.nisum.employee.ref.service.ClientInfoService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class ClientInfoControllerTest {
	
	private MockMvc mockMvc;
	
	@InjectMocks
	ClientInfoController clientInfoController = new ClientInfoController();
	
	@Mock
	private ClientInfoService clientInfoService;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(clientInfoController).build();
	}
	
	@Test
	public void shouldRetrieveProfileByEmailId() throws Exception {
		
		List<String> clients = Lists.newArrayList();
		doReturn(clients).when(clientInfoService).getClientNames();
		mockMvc.perform(get("/clientNames")).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldGetClientInfoIfClientNameIsNotEmpty() throws Exception {
		
		List<ClientInfo> clients = Lists.newArrayList(new ClientInfo());
		doReturn(clients).when(clientInfoService).getClientDetailsByClient(any(String.class));
		mockMvc.perform(get("/clientInfo?clientName="+any(String.class))).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldGetClientInfoIfClientNameIsEmpty() throws Exception {
		
		List<ClientInfo> clients = Lists.newArrayList(new ClientInfo());
		doReturn(clients).when(clientInfoService).getClientDetails();
		mockMvc.perform(get("/clientInfo?clientName="+"")).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldNotGetClientInfoIfClientNameIsNotEmpty() throws Exception {
		List<ClientInfo> clients = Lists.newArrayList(new ClientInfo());
		
		when(clientInfoService.getClientDetailsByClient(anyString())).thenReturn(clients);
		mockMvc.perform(
				get("/clientInfo").contentType(MediaType.APPLICATION_JSON).
				content("")).andExpect(status().isNotFound());
			
	}
	
	@Test
	public void shouldGetInterviewerNames() throws Exception {
		
		List<String> interviewerNames = Lists.newArrayList();
		doReturn(interviewerNames).when(clientInfoService).getInterviewerNames();
		mockMvc.perform(get("/interviewerNames")).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldGetClientById() throws Exception {
		
		List<ClientInfo> clients = Lists.newArrayList(new ClientInfo());
		doReturn(clients).when(clientInfoService).getClientById(any(String.class));
		mockMvc.perform(get("/getClientById?clientId="+any(String.class))).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldDeleteClient() throws Exception {
		
		mockMvc.perform(delete("/clientInfo?clientId="+any(String.class))).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldCreateClient() throws Exception {		
		
		mockMvc.perform(post("/clientInfo").content(MockTestUtil.convertToJsonFormat(new ClientInfo()))
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldUpdateClient() throws Exception {		
		
		mockMvc.perform(put("/clientInfo").content(MockTestUtil.convertToJsonFormat(new ClientInfo()))
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isAccepted());
		
	}
	
	
	
	

}
