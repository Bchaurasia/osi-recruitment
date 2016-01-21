package com.nisum.employee.ref.service;

import java.util.List;

import javax.mail.MessagingException;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.InterviewFeedback;
import com.nisum.employee.ref.domain.InterviewSchedule;
import com.nisum.employee.ref.domain.Profile;

public interface IInterviewDetailsService {
	InterviewDetails  saveFeedback(InterviewFeedback interviewFeedback) throws MessagingException;
	
	InterviewDetails  scheduleInterview(InterviewSchedule interviewSchedule) throws Exception;
	
	List<InterviewDetails> getInterview(String interviewerId);
	
	List<InterviewDetails> getInterviewByInterviewer(String interviewerEmail) ;
		
	List<InterviewDetails> getAll();
	
	List<InterviewDetails> getInterviewByJobCode(String jobCode);
	
	List<InterviewDetails> getInterviewByCandidateId(String candidateId);
	
	InterviewDetails enrichInterviewDetails(InterviewDetails interviewDetails2 ,InterviewSchedule interviewSchedule);
	
	InterviewDetails enrichInterviewDetails2(InterviewDetails interviewDetails2 ,InterviewFeedback interviewFeedback);

	InterviewDetails createInterview(InterviewDetails interviewDetails);

	List<InterviewDetails> getInterviewByClient(String client);

	List<InterviewDetails> getInterviewByProgress(String progress);

	List<InterviewDetails> getInterviewBySkill(String progress);

	List<InterviewDetails> getInterviewByDesignation(String designation);

	List<InterviewDetails> getInterviewByinterviewId(String interviewId);

	void updateInterviewDetails(InterviewDetails interviewDetails);

}
