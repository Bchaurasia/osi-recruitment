package com.nisum.employee.ref.domain;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;


@Getter
@Setter
public class RegisterUser{
	@Id
	String versionId;
	String emailId;
	
	String firstname;
	String lastname;
	
	String location;
	String mobileNo;
	String password;
	String confirmPassword;
	
}
