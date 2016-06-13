package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequisitionApproverDetails {
	
	private String jobRequisitionId;
	private String approverName;
	private String approverEmailId;
	private String requisitionManagerEmail;
	private String HREmailId;
	private String comment;
	private String position;
	
}
