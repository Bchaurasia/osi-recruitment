package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.ordBands;
import com.nisum.employee.ref.domain.Offer;
import com.nisum.employee.ref.domain.OrgBandUpdateParams;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.repository.OfferRepository;

@Service
public class OfferService {

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
	
	public List<Offer> retrieveOfferDataForDashboard() {
		List<Offer> offerdetail = new ArrayList<>();
		List<Offer> offerdetaillist = OfferRepository.retrieveAllOfferDetails();
		String loginUser=SecurityContextHolder.getContext().getAuthentication().getName();
		for (int i = 0; i < offerdetaillist.size(); i++) {
			if(offerdetaillist.get(i).getApproval().getEmailId().equals(loginUser)){
				offerdetail.add(offerdetaillist.get(i));
			}
		}
		return offerdetail;
	}

	public List<ordBands> retrieveBandOfferDetails() {
		return OfferRepository.retrieveBandOfferDetails();
	}
	
	public void retrieveBandDetails(OrgBandUpdateParams ord) {
		OfferRepository.updateDesignation(ord);
	}

	public void offerToBeApproved(Offer offer) {
		try {
			notificationService.sendOfferApprovalNotification(offer);
		} catch (ResourceNotFoundException | ParseErrorException | MethodInvocationException | MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void approveOffer(Offer offer) {
		try {
			notificationService.approvedNotification(offer);
			;
		} catch (ResourceNotFoundException | ParseErrorException | MethodInvocationException | MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}