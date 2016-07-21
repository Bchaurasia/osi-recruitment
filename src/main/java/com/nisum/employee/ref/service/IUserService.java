package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.UserInfo;

public interface IUserService {
	UserInfo registerUserByEmailId(UserInfo userInfo);

	List<UserInfo> retrieveUser();

	UserInfo retrieveUserById(String userId);

	List<UserInfo> retrieveUserByName(String name);

	UserInfo createUserInfo(String userName);

	void updateUser(UserInfo user);

	List<UserInfo> retrieveUserByClient(String clientName);
	
	List<UserInfo> retrieveUserByRole(String role);
	
	boolean isUserAlradyExist(String emailId);
}
