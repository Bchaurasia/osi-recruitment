package com.nisum.employee.ref.domain;
import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;


@Getter
@Setter
//@Document(collection = "Profile")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "profiles",type = "profile", shards = 1, replicas = 0, refreshInterval = "-1")
public class Profile{
	String candidateName ;
	@Id
	String emailId;
	String qualification;
	ArrayList<String> primarySkills;
	String expYear;
	String expMonth;
	String uploadedFileName;
	String mobileNo;
	String designation;
	String pancardNo;
	String passportNo;
	String stream;
	String address;
	String notes;
	String altmobileNo;
	String currentEmployer;
	String profilecreatedBy;
	String profileTimeStamp;
	String profileModifiedTimeStamp;
	String profileModifiedBy;
	String referredBy;
	String hrAssigned;
	ArrayList<String> jobcodeProfile;
	Boolean interviewSet;
	String skypeId;
	String status;
}
