package com.nisum.employee.ref.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
//@Setter
@AllArgsConstructor
public class Round {
	private String roundName;
	private InterviewSchedule interviewSchedule;
	private InterviewFeedback interviewFeedback;
}
