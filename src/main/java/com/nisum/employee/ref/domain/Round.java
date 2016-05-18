package com.nisum.employee.ref.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Round {
	private String roundName;
	private InterviewSchedule interviewSchedule;
	private InterviewFeedback interviewFeedback;
}
