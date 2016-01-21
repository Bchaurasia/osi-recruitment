package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Designation")
public class Designation {
	
	@Id
	String designation;
	List<String> skills;
    String minExpYear;
	String maxExpYear;
}

