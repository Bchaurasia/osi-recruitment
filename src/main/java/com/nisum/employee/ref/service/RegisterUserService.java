package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.RegisterUser;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.RegisterUserRepository;
import com.nisum.employee.ref.repository.UserInfoRepository;
import com.nisum.employee.ref.util.EncryptDecrypt;

@Service
public class RegisterUserService {
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private RegisterUserRepository registerUserRepository;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	public void sendMailToUser(RegisterUser registerUser) throws Exception {
		String encryptedPwd = EncryptDecrypt.encrypt(registerUser.getPassword());
		registerUser.setPassword(encryptedPwd);
		registerUser.setConfirmPassword(encryptedPwd);
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

	public void saveInUserInfo(RegisterUser registerUser) throws Exception {
		UserInfo userInfo = new UserInfo();
		userInfo.setName(registerUser.getFirstname()+" "+registerUser.getLastname());
		userInfo.setEmailId(registerUser.getEmailId());
		userInfo.setLocation(registerUser.getLocation());
		userInfo.setMobileNumber(registerUser.getMobileNo());
		userInfo.setPassword(registerUser.getPassword());
		List<String> defualtRoles = new ArrayList<>();
		defualtRoles.add("ROLE_USER");
		userInfo.setRoles(defualtRoles);
		userInfoRepository.registerUserByEmailId(userInfo);
	}
	
	public boolean isUserAlradyExist(String emailId) {
		return userInfoRepository.isUserExists(emailId)? true: registerUserRepository.getUserDetailsByEmailId(emailId);
	}
	
}