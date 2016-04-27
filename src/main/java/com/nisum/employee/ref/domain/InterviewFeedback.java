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
	List<Rating> domainSkills;
	int communicationSkills;
	int consultingAndArticulationSkills;
	int managementSkillset;
	int selfLearningAndInitiative;
	int customerOrientation;
	int businessAttitude;
	int flexibility;
	int teamWork;
	int onsiteSuitability;
	String additionalSkills;
	String strengths;
	String improvement;
	String duration;
	String candidateId;
	String candidateName;
	String status;
	String technicalComment;
	String functionalComment;
	String softSkillComment;
	String managementSkillComment;
	String communicationSkillComment;
	String consultingAndArticulationSkillsComment;
}
