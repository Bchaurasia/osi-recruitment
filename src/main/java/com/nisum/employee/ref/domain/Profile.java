package com.nisum.employee.ref.domain;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;


@Getter
@Setter
//@Document(collection = "Profile")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "profiles",type = "profile", shards = 1, replicas = 0, refreshInterval = "-1")
public class Profile extends AuditEntity{
	String candidateName;
	@Id
	String emailId;
	//String qualification;
	ArrayList<String> primarySkills;
	String otherSkills;
	String expYear;
	String expMonth;
	String uploadedFileName;
	String mobileNo;
	String designation;
	String pancardNo;
	String passportNo;
	String jobCode;
	String requisitionId;
	List<CandidateQualification> qualifications;
	String address;
	String notes;
	String altmobileNo;
	String currentEmployer;
	String referredBy;
	String hrAssigned;
	ArrayList<String> jobcodeProfile;
	Boolean interviewSet;
	String skypeId;
	String status;
	String referralRelation;
	String tenureYear;
	String tenureMonth;
	String screeningStatus;
	String compatibilityStatus;
	String profileSource;
	float currentCTC;
	float expectedCTC;
	int noticePeriod; 
	String currentLocation;
	String expectedDesignation;
	Boolean isApprovedFlag;
	Boolean isCreatedByUser;
	Boolean isReferral;
	
}
