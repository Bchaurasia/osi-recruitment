package com.nisum.employee.ref.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.RegisterUser;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.RegisterUserRepository;
import com.nisum.employee.ref.repository.UserInfoRepository;

@Service
public class RegisterUserService {
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private RegisterUserRepository registerUserRepository;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	public void sendMailToUser(RegisterUser registerUser) {
		
		registerUserRepository.save(registerUser);
		try {
			notificationService.sendVerificationMailToRegisteredUser(registerUser);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

	public RegisterUser getUserDetailsFromVersionId(String versionId) {
		return registerUserRepository.getUserDetailsFromVersionId(versionId);
	}

	public void saveInUserInfo(RegisterUser registerUser) {
		UserInfo userInfo = new UserInfo();
		userInfo.setName(registerUser.getFirstname()+" "+registerUser.getLastname());
		userInfo.setEmailId(registerUser.getEmailId());
		userInfo.setLocation(registerUser.getLocation());
		userInfo.setMobileNumber(registerUser.getMobileNo());
		userInfo.setPassword(registerUser.getPassword());
		userInfoRepository.registerUserByEmailId(userInfo);
	}
	
	public boolean isUserAlradyExist(String emailId) {
		return userInfoRepository.isUserExists(emailId)? true: registerUserRepository.getUserDetailsByEmailId(emailId);
	}
	
	
	
	
}