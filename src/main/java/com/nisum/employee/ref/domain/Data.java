package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Data{
	private String id;
	private String designation;
	private int count;
	private List<String> clientNames;
	
}