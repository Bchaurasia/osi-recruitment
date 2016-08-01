package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Series {

	private String id;
	private String name;
	private List<Data> data;
}
