package com.nisum.employee.ref.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.nisum.employee.ref.domain.Offer;
import com.nisum.employee.ref.repository.OfferRepository;
import com.nisum.employee.ref.service.OfferService;

@Controller
public class OfferController {
	
	private static final String MSG_START = "{\"msg\":\"";
	private static final String MSG_END = "\"}";
	@Autowired
	private OfferService offerService;
	
	@Autowired
	private OfferRepository offerRepository;
	
	@ResponseBody
	@Secured({"ROLE_ADMIN","ROLE_HR"})
	@RequestMapping(value="/save-offer", method=RequestMethod.POST)
	public ResponseEntity<Offer> saveOfferDetails(@RequestBody Offer offer) {
		offerService.prepareOffer(offer);;
		return new ResponseEntity<Offer>(offer, HttpStatus.OK);
	}
	
	@Secured({"ROLE_HR","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/offer", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveOffer(@RequestParam(value = "emailId", required = true) String emailId) throws Exception {
		Offer offerdetail=offerService.getOfferDetail(emailId);
		return new ResponseEntity<Offer>(offerdetail, HttpStatus.OK);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN","ROLE_HR"})
	@RequestMapping(value = "/upload-offer-letter", method = RequestMethod.POST)
	public ResponseEntity<String> uploadOfferLetter	(HttpServletRequest request,@RequestParam(value = "file") MultipartFile multipartFile, @RequestParam(value = "candidateId", required = true) String candidateId) throws Exception {
		offerRepository.saveResumeInBucket(multipartFile, candidateId);
		return new ResponseEntity<String>("Resume Uploaded Successfully", HttpStatus.OK);
	}
	@Secured({"ROLE_HR"})
	@ResponseBody
	@RequestMapping(value = "/approveOffer", method = RequestMethod.POST)
	public ResponseEntity<?> approveOffer(@RequestBody Offer offer) throws Exception {
		offerService.approveOffer(offer);
		String jsonObj = MSG_START + "Notification send to "+offer.getApproval().getName()+" Successfully"+ MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}
}
