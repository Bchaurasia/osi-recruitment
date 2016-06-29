package com.nisum.employee.ref.domain;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data()
//@Document(collection = "offer")
public class Offer extends AuditEntity {

	@Id
	private String emailId;
	private String requisitionId;
	private String jobcodeProfile;
	private String approvedPositions;
	private String proposedPosition;
	private String businessUnit;
	private String candidateName;
	private String expYear;
	List<CandidateQualification> qualification;
	private String currentEmployer;
	private String profileSource;
	private UserVO recruiter;
	private float lastDrawnCTC;
	private float expectedCTC;
	private float proposedCTC;
	private int noticePeriod;
	private String relocationExpensesOffered;
	private String currentLocation;
	private String WorkLocation;
	private String comments;
	private OfferApprover approval;
	private String reportingManager;
	private String client;
	private String project;
	private Date expectedJoiningDate;
	private String singInBonus;
	private String offerStatus;
	private List<OfferApprover> approvalList;
}
