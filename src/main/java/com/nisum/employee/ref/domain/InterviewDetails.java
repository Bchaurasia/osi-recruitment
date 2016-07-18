package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "interviews",type = "interview", shards = 1, replicas = 0, refreshInterval = "-1")
public class InterviewDetails  {
	
	@Id
	String interviewerId;
	String candidateName;
	ArrayList<String> positionId;
	String currentPositionId;
	ArrayList<String> candidateSkills;
	String candidateEmail;
	String interviewerEmail;
	ArrayList<String> scheduledInterviewersEmails;
	Boolean isMultipleInterviewFlag;
	String interviewerName;
	String clientName;
	String progress;
	String designation;
	String hrAssigned;
	String jobCode;
	String jobDescription;
	String requisitionId;
	String status;
	String roundName;
	List <Round> rounds;
	String interviewDateTime;
	Boolean isReferral;

}
