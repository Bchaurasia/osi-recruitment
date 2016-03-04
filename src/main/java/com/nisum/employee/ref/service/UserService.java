package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.UserInfoRepository;

@Service
public class UserService implements IUserService{

	@Autowired
	private UserInfoRepository userInfoRepository;

	
	public void registerUserByEmailId(String emailId) {
		userInfoRepository.registerUserByEmailId(emailId);
	}
	
	public List<UserInfo> retrieveUser() {
		return userInfoRepository.retrieveUser();
	}
	
	public List<UserInfo> retrieveUserById(String userId) {
		return userInfoRepository.retrieveUserById(userId);
	}
	
	public List<UserInfo> retrieveUserByName(String name) {
		return userInfoRepository.retrieveUserByName(name);
	}
	
	public UserInfo createUserInfo(String userName) {
		return userInfoRepository.createUserInfo(userName);
	}
	
	public void updateUser(UserInfo user) {
		userInfoRepository.updateUser(user);
	}
	
	public List<UserInfo> retrieveUserByClient(String clientName) {
		return userInfoRepository.retrieveUserByClient(clientName);
	}
	
	
	public List<UserInfo> retrieveUserByRole(String role) {
		return userInfoRepository.retrieveUserByRole(role);
	}
}
