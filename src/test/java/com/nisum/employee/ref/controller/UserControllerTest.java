package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.service.UserService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {
	
	private MockMvc mockMvc;
	
	@InjectMocks
	private UserController userController;
	
	@Mock
	private UserService userService;
	
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
	}

	@Test
	public void shouldRegisterUserByEmailId() throws Exception{
		mockMvc.perform(
				post("/user")
				.content(MockTestUtil.convertToJsonFormat(new UserInfo()))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	@Test
	public void shouldRetrieveUsers() throws Exception
	{
		List<UserInfo> userInfo = Lists.newArrayList(new UserInfo());
		doReturn(userInfo).when(userService).retrieveUser();
		mockMvc.perform(get("/user")).andExpect(status().isOk());
	}
	
	@Test
	public void shouldRetrieveUserById() throws Exception
	{
		List<UserInfo> userInfo = Lists.newArrayList(new UserInfo());
		doReturn(userInfo).when(userService).retrieveUserById(any(String.class));
		mockMvc.perform(get("/user?emailId="+any(String.class))).andExpect(status().isOk());
	}
	
	@Test
	public void shouldRetrieveUserByName() throws Exception
	{
		List<UserInfo> userInfo = Lists.newArrayList(new UserInfo());
		doReturn(userInfo).when(userService).retrieveUserByName(any(String.class));
		mockMvc.perform(get("/user?name="+any(String.class))).andExpect(status().isOk());
	}
	
	@Test
	public void shouldRetrieveUserByClient() throws Exception
	{
		List<UserInfo> userInfo = Lists.newArrayList(new UserInfo());
		doReturn(userInfo).when(userService).retrieveUserByClient(any(String.class));
		mockMvc.perform(get("/user?clientName="+any(String.class))).andExpect(status().isOk());
	}
	@Test
	public void ifUserNotFound() throws Exception
	{
		List<UserInfo> userInfo = Lists.newArrayList(new UserInfo());
		doReturn(null).when(userService).retrieveUser();
		mockMvc.perform(get("/user")).andExpect(status().isNotFound());
	}
	
	@Test
	public void shouldUpdateUser() throws Exception
	{
		mockMvc.perform(put("/user").content(MockTestUtil.convertToJsonFormat(new UserInfo())).contentType(MediaType.APPLICATION_JSON)
		.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}
	
}
