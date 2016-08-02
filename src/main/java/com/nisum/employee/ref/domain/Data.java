package com.nisum.employee.ref.domain;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Data{
	private String id;
	private String designation;
	private int count;
	Map<String,Integer> client;
	//private List<String> clientNames;
	
}