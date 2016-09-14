package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandidateLanguage {
	String language;
	Boolean read;
	Boolean write;
	Boolean speak;
	String proficiency;
}
