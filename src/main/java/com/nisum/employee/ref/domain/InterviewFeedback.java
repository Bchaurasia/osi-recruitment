package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class InterviewFeedback {
	
	String roundName;
	String interviewerName;
	String interviewerEmail;
	String jobcode;
	String interviewDateTime;
	String typeOfInterview;
	List<Rating> rateSkills;
	String additionalSkills;
	String strengths;
	String improvement;
	String duration;
	String candidateId;
	String candidateName;
}
