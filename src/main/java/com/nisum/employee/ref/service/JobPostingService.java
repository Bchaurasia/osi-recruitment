package com.nisum.employee.ref.service;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.repository.PositionRepository;
import com.nisum.employee.ref.repository.RequisitionRepository;
import com.nisum.employee.ref.search.PositionSearchService;

@Service
public class JobPostingService implements IJobPostingService {
	
	@Autowired
	private RequisitionRepository requisitionRepository;
	
	@Autowired
	PositionSearchService positionSearchService;
	
	@Autowired
	PositionRepository positionRepository;
	
	@Autowired
	private NotificationService notificationService;
	
	public void postReferalJob(Position position) throws Exception {
		Position updatePublishStatus = positionRepository.updatePublishStatus(position);
		Position position1 = requisitionRepository.retrievePositionBasedOnId(position.getJobcode());
		Requisition requisition = requisitionRepository.retrieveRequisitionBasedOnId(position.getRequisitionId());
	 
	 try {
		 //notificationService.sendRefralJob(requisition);
		 notificationService.sendJobToReffarals(position1,requisition);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		positionSearchService.updatePositionIndex(updatePublishStatus);

		
	}

	

}
