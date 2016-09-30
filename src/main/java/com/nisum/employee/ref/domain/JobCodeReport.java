package com.nisum.employee.ref.domain;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "jobcodereport",type = "jobcodereports", shards = 1, replicas = 0, refreshInterval = "-1")
public class JobCodeReport extends AuditEntity{

	@Id
	String jobcode;
	String requisitionId;
	String inteviewCounter;
	String offeredCounter;
	String declinedCounter;
}
