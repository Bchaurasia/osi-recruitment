package com.nisum.employee.ref.domain;

import static org.springframework.data.elasticsearch.annotations.FieldIndex.not_analyzed;
import static org.springframework.data.elasticsearch.annotations.FieldType.String;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "position",type = "positions", shards = 1, replicas = 0, refreshInterval = "-1")
public class Position  extends AuditEntity{

	@Id
	String jobcode;
	String requisitionId;
	@Field(type = String, index = not_analyzed)
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
	boolean publishStatus;
}
