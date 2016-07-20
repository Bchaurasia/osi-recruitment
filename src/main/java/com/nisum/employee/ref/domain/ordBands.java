package com.nisum.employee.ref.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "orgBands")
public class ordBands { 
	
	@Id
	String orgBand;
	String BU;
	String stream;
	private List<level> levels;
}
