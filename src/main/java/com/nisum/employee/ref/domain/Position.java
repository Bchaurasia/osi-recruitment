package com.nisum.employee.ref.domain;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "Position")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "position",type = "positions", shards = 1, replicas = 0, refreshInterval = "-1")
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
	String priority;
	Integer noOfPositions;
	String interviewer;
	String jobType;
	String salary;
	UserVO hiringManager;
}
