package com.nisum.employee.ref.service;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;

import com.nisum.employee.ref.domain.InterviewFeedback;
import com.nisum.employee.ref.domain.InterviewSchedule;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;

public interface INotificationService {
	void sendFeedbackMail(InterviewFeedback interviewFeedback) throws MessagingException;
	String sendScheduleMail(InterviewSchedule interviewSchedule, String mobileNo, String altMobileNo, String skypeId)
			throws Exception;
	void sendJobRequisitionNotification(RequisitionApproverDetails requisitionApproverDetails) throws AddressException,
			MessagingException, ResourceNotFoundException, ParseErrorException, MethodInvocationException;
	void sendRejectRequisitionNotification(RequisitionApproverDetails requisitionApproverDetails)throws AddressException, MessagingException,
	ResourceNotFoundException, ParseErrorException,MethodInvocationException;
}
