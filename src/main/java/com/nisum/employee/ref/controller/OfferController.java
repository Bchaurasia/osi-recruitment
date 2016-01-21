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

@Controller
public class OfferController {

	@Autowired
	private OfferRepository offerRepository;
	
	@ResponseBody
	@RequestMapping(value="/save-offer", method=RequestMethod.POST)
	public ResponseEntity<Offer> saveOfferDetails(@RequestBody Offer offer) {
		offerRepository.saveOffer(offer);
		return new ResponseEntity<Offer>(offer, HttpStatus.OK);
	}
	
	
	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER"})
	@RequestMapping(value = "/upload-offer-letter", method = RequestMethod.POST)
	public ResponseEntity<String> uploadOfferLetter	(HttpServletRequest request,@RequestParam(value = "file") MultipartFile multipartFile, @RequestParam(value = "candidateId", required = true) String candidateId) throws Exception {
		offerRepository.saveResumeInBucket(multipartFile, candidateId);
		return new ResponseEntity<String>("Resume Uploaded Successfully", HttpStatus.OK);
	}
}
