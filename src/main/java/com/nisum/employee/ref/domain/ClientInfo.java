package com.nisum.employee.ref.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClientInfo {
	@Id
	String clientId;
	String clientName;
	String locations;
	Interviewer interviewers;
}
