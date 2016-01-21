package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = false)
@Data()
@Document(collection = "offer")
public class Offer extends AuditEntity {

	@Id
	private String emailId;
	private String client;
	private String project;
	private String hrManager;
	private String reportingManager;
	private String imigrationStatus;
	private String relocationAllowance;
	private String singInBonus;
	private String comments;
	private Date joiningDate;
	private ArrayList<String> jobcodeProfile;
	private String location;
	private String offerLetterName;
}
