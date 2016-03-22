package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequisitionUser { 
	String emailId;
	String name;
	boolean isApproved;
	String comment;
}
