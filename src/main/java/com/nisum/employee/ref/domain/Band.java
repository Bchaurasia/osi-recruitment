package com.nisum.employee.ref.domain;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Band { 
	@Id
	String orgBand;
	String bu;
	String stream;
	String level;
	private OfferDesignation designation;
}
