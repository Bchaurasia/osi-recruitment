package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

import com.nisum.employee.ref.domain.UserNotification;
import com.nisum.employee.ref.service.UserNotificationService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class UserNotificationControllerTest {
	
	private MockMvc mockMvc;
	
	@InjectMocks
	UserNotificationController userNotificationController = new UserNotificationController();
	
	@Mock
	private UserNotificationService userNotificationService;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(userNotificationController).build();
	}
	
	@Test
	public void shouldRetrieveNotification() throws Exception {
		List<UserNotification> userInfo = Lists.newArrayList(new UserNotification());
		when(userNotificationService.getUserNotifications(any(String.class))).thenReturn(userInfo);
		mockMvc.perform(
				get("/userNotification?userId="+any(String.class))).andExpect(status().isOk());
		
	}

	@Test
	public void shouldNotRetrieveNotificationForEmptyUserId() throws Exception {
		
		when(userNotificationService.getUserNotifications(anyString())).thenReturn(null);
		mockMvc.perform(
				get("/userNotification").contentType(MediaType.APPLICATION_JSON).
				content("")).andExpect(status().isNotFound());
				
	}
	
	@Test
	public void shouldReadNotification() throws Exception {
		mockMvc.perform(
				post("/userNotification?userId="+any(String.class)+"&message="+any(String.class)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldRetrieveNoNotification() throws Exception {
		List<UserNotification> userInfo = Lists.newArrayList(new UserNotification());
		when(userNotificationService.getUserNoNotifications(any(String.class))).thenReturn(userInfo);
		
		mockMvc.perform(
				get("/noNotification?userId="+any(String.class)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		
	}
	
	@Test
	public void shouldNotRetrieveNoNotificationForEmptyUserId() throws Exception {
		
		when(userNotificationService.getUserNoNotifications(anyString())).thenReturn(null);
		mockMvc.perform(
				get("/noNotification").contentType(MediaType.APPLICATION_JSON).
				content("")).andExpect(status().isNotFound());
		
	}
	
	@Test
	public void shouldRetrieveNotificationCount() throws Exception {
		//when(userNotificationService.getUserNotificationCount(any(String.class))).thenReturn(long.class);
		mockMvc.perform(
				get("/getNotificationCount").contentType(MediaType.APPLICATION_JSON).
				content(MockTestUtil.convertToJsonFormat(anyString()))).andExpect(status().isOk());
		
	}
	
}
