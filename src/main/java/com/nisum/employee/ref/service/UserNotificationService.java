package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.UserNotification;
import com.nisum.employee.ref.repository.UserNotificationRepository;


@Service
public class UserNotificationService {
	
	@Autowired
	UserNotificationRepository userNotificationRepository;
	
	public List<UserNotification> getUserNotifications(String userId){
		return userNotificationRepository.retrieveNotifications(userId);
	}
	
	public List<UserNotification> getUserNoNotifications(String userId){
		return userNotificationRepository.retrieveNoNotifications(userId);
	}
	
	public void readNotification(String userId, String message){
		userNotificationRepository.readNotifications(userId, message);
	}
	
	public void createNotification(UserNotification userNotification){
		userNotificationRepository.createNotifications(userNotification);
	}
	
	public long getUserNotificationCount(String userId){
		return userNotificationRepository.getUserNotificationCount(userId);
	}
}
