package com.nisum.employee.ref.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobDescription {
	@Id
	String jobDescriptionName;
	String client;
	List<String> skills;
	String jobDescriptionDetails;
}