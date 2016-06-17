package com.nisum.employee.ref.service;

import javax.mail.MessagingException;

import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Offer;
import com.nisum.employee.ref.repository.OfferRepository;

@Service
public class OfferService{

	@Autowired
	OfferRepository OfferRepository;

	@Autowired
	private NotificationService notificationService;
	
	public void prepareOffer(Offer offerDetail) {
		OfferRepository.saveOffer(offerDetail);
	}
	
	public Offer getOfferDetail(String emailId) {
		return OfferRepository.retrieveOfferDetails(emailId);
	}
	
	public void approveOffer(Offer offer) {
		try {
			notificationService.sendOfferApprovalNotification(offer);
		} catch (ResourceNotFoundException | ParseErrorException | MethodInvocationException | MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}