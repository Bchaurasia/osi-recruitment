package com.nisum.employee.ref.domain;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonInclude;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "position",type = "positions", shards = 1, replicas = 0, refreshInterval = "-1")
public class Position  extends AuditEntity{

	@Id
	String jobcode;
	String requisitionId;
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
	String interviewer;
	UserVO hiringManager;
	String status;
	String positionType;
	String targetDate;
	boolean publishStatus;
}
