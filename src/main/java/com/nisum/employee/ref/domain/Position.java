package com.nisum.employee.ref.domain;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Position")
public class Position extends AuditEntity {

	@Id
	String jobcode;
	String designation;
	String minExpYear;
	String maxExpYear;
	ArrayList<String> primarySkills;
	ArrayList<String> interviewRounds;
	String secondarySkills;
	String jobProfile;
	String location;
	String client;
	String hiringManager;
	String priority;
	Integer noOfPositions;
	String interviewer;
	String jobType;
	String salary;

}
