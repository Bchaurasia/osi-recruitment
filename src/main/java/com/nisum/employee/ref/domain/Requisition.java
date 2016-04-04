package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "Requisition")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "requisitions",type = "requisition", shards = 1, replicas = 0, refreshInterval = "-1")
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
	String updatedBy;
	String status;
	@CreatedDate
	Date createdDate;
	@LastModifiedDate
	private Date updatedDate;
}
