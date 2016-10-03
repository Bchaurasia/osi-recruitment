package com.nisum.employee.ref.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@Document(collection = "UserInfo")
public class UserInfo { 
	@Id
	String emailId;
	String name;
	//String dob;
	String doj;
	String skypeId;
	String location;
	String company;
	String projectName;
	String mobileNumber;
	Boolean isNotAvailable;
	List<String> roles;
	List<String> clientName;
	List<String> skills;
	List<String> categories;
	List<TimeSlots> timeSlots;
}
