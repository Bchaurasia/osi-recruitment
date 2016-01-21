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

	@Override
	public void registerUserByEmailId(String emailId) {
		userInfoRepository.registerUserByEmailId(emailId);
	}
	@Override
	public List<UserInfo> retrieveUser() {
		return userInfoRepository.retrieveUser();
	}
	@Override
	public List<UserInfo> retrieveUserById(String userId) {
		return userInfoRepository.retrieveUserById(userId);
	}
	@Override
	public List<UserInfo> retrieveUserByName(String name) {
		return userInfoRepository.retrieveUserByName(name);
	}
	@Override
	public UserInfo createUserInfo(String userName) {
		return userInfoRepository.createUserInfo(userName);
	}
	@Override
	public void updateUser(UserInfo user) {
		userInfoRepository.updateUser(user);
	}
	@Override
	public List<UserInfo> retrieveUserByClient(String clientName) {
		return userInfoRepository.retrieveUserByClient(clientName);
	}
	
	@Override
	public List<UserInfo> retrieveUserByRole(String role) {
		return userInfoRepository.retrieveUserByRole(role);
	}
}
