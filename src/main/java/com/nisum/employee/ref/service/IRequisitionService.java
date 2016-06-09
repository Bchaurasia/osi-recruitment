package com.nisum.employee.ref.service;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;


public interface IRequisitionService {
	public void prepareRequisition(Requisition requisition);
	public RequisitionApproverDetails updateRequisition(Requisition requisition) throws AddressException, MessagingException;
	public void rejectRequisition(Requisition requisition);
	public void cloneRequisition(Requisition requisition);
	public List<Requisition> retrieveAllRequistions();
	public String approveRequisition(Requisition requisition) throws AddressException, MessagingException;
	public Requisition retrieveRequisitionBasedOnId(String requisitionId);
	void updateRequisition1(Requisition requisition) throws AddressException,
			MessagingException;
	
}