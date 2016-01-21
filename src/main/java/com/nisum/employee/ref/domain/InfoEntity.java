package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Info")
public class InfoEntity {
	
	@Id
	String key;
	List<String> value;
}
