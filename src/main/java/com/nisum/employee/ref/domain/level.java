package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class level { 
	
	String level;
	String minExp;
	String maxExp;
	private List<OfferDesignation> designations;
}
