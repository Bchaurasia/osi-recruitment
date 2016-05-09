package com.nisum.employee.ref.service;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.nisum.employee.ref.domain.UserNotification;
import com.nisum.employee.ref.repository.UserNotificationRepository;

@RunWith(MockitoJUnitRunner.class)
public class UserNotificationServiceTest {
	
	@InjectMocks
	UserNotificationService userNotificationService = new UserNotificationService();
	
	@Mock
	private UserNotificationRepository userNotificationRepository;
	
	@Test
	public void shouldGetUserNotifications() throws Exception {			
		
		userNotificationService.getUserNotifications(any(String.class));
		
		verify(userNotificationRepository, times(1)).retrieveNotifications(any(String.class));
	}
	
	@Test
	public void shouldCreateNotification() throws Exception {			
		
		userNotificationService.createNotification(any(UserNotification.class));
		
		verify(userNotificationRepository, times(1)).createNotifications(any(UserNotification.class));
	}
	
	@Test
	public void shouldGetUserNoNotifications() throws Exception {			
		
		userNotificationService.getUserNoNotifications(any(String.class));
		
		verify(userNotificationRepository, times(1)).retrieveNoNotifications(any(String.class));
	}
	
	@Test
	public void shouldReadNotification() throws Exception {			
		
		userNotificationService.readNotification(any(String.class),any(String.class));
		
		verify(userNotificationRepository, times(1)).readNotifications(any(String.class),any(String.class));
	}
	
	@Test
	public void shouldGetUserNotificationCount() throws Exception {			
		
		userNotificationService.getUserNotificationCount(any(String.class));
		
		verify(userNotificationRepository, times(1)).getUserNotificationCount(any(String.class));
	}

}
