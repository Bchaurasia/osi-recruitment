package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;

@Getter
@Setter
public  class AuditEntity {
	
	@CreatedDate
	private DateTime createdDate;
	
	@CreatedBy
	private String createdBy;
	
	@LastModifiedDate
	private DateTime lastModifiedDate;
	
	@LastModifiedBy
	private String lastModifiedBy;
	
	@Version
	private Long version;

}
