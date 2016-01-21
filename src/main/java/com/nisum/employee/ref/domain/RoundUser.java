package com.nisum.employee.ref.domain;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoundUser {
	String name;
	String emailId;
	ArrayList<String> skillSet;
}
