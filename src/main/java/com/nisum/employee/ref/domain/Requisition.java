package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
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
	String comment;
	String updatedBy;
	String createdBy;
	String status;
	ArrayList<String> skillType;
	List<Qualification> qualifications;
	UserVO requisitionManager;
	RequisitionUser approval1;
	RequisitionUser approval2;
}
