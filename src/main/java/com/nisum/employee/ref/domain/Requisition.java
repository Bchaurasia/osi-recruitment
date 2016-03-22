package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "Requisition")
public class Requisition {
	@Id
	String requisitionId;
	String position;
	String noOfPositions;
	String client;
	String minExpYear;
	String maxExpYear;
	String requisitionDate;
	String targetDate;
	String location;
	String jobDescription;
	List<Qualification> qualifications;
	ArrayList<String> skillType;
	RequisitionUser approval1;
	RequisitionUser approval2;
	String comment;
	UserVO requisitionManager;
	String createdBy;
}
