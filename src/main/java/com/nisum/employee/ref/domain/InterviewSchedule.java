package com.nisum.employee.ref.domain;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterviewSchedule extends AuditEntity{
	String roundName;
	String interviewerName;
	String jobcode;
	String jobDescription;
	String requisitionId;
	String interviewerMobileNumber;
	String skypeId;
	String candidateSkypeId;
	String candidateMobileNumber;
	String interviewDateTime;
	String typeOfInterview;
	String interviewLocation;
	String emailIdInterviewer;
	String additionalNotes;
	String candidateId;
	String candidateName;
	Boolean isFeedBackSubmitted;
	ArrayList<String> candidateSkills;
	String interviewAddress;
	String roundStatus;
	
}
