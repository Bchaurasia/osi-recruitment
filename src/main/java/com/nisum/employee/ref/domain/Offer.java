package com.nisum.employee.ref.domain;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data()
@JsonInclude(JsonInclude.Include.NON_NULL)
//@Document(collection = "offer")
public class Offer extends AuditEntity {

	@Id
	private String emailId;
	private String requisitionId;
	private String jobcodeProfile;
	private String approvedPositions;
	private String candidateName;
	private String expYear;
	List<CandidateQualification> qualification;
	private String currentEmployer;
	private String profileSource;
	private int lastDrawnCTC;
	private int expectedCTC;
	private int proposedCTC;
	private int noticePeriod;
	private int relocationExpensesOffered;
	private String currentLocation;
	private String workLocation;
	private String comments;
	private OfferApprover approval;
	private UserVO reportingManager;
	private String client;
	private String project;
	private Date expectedJoiningDate;
	private int singInBonus;
	private String offerStatus;
	private List<OfferApprover> approvalList;
	private String currency;
	private String finalStatus;
	private Band orgGrade;
	
}
