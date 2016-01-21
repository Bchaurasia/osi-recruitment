package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Interviewer {
	List<RoundUser> technicalRound1;
	List<RoundUser> technicalRound2;
	List<RoundUser> hrRound;
	List<RoundUser> managerRound;
}
