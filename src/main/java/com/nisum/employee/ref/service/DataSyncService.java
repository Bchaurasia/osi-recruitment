package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.repository.PositionRepository;
import com.nisum.employee.ref.search.InterviewIndexRepository;
import com.nisum.employee.ref.search.PositionIndexRepository;
import com.nisum.employee.ref.search.ProfileIndexRepository;
import com.nisum.employee.ref.search.RequisitionIndexRepository;


@Service
public class DataSyncService implements IDataSyncService{

	@Autowired
	ProfileService profileService;
	@Autowired
	private InterviewService interviewService;
	
	@Autowired
	RequisitionService requisitionService;
	
	@Autowired
	PositionService positionService;
	
	@Autowired
	private RequisitionIndexRepository requisitionIndexRepository;
	
	@Autowired
	PositionRepository positionRepository;
	@Autowired
	PositionIndexRepository positionIndexRepository;
	@Autowired
	InterviewIndexRepository interviewIndexRepository;
	@Autowired
	ProfileIndexRepository profileIndexRepository;
	@Override
	public List<String> deleteDataIndex() {
		
		List<String> operations = new ArrayList<>();
		requisitionIndexRepository.deleteAll();
		operations.add("requistions deleted");
		positionIndexRepository.deleteAll();
		operations.add("positions deleted");
		interviewIndexRepository.deleteAll();
		operations.add("interview details deleted");
		profileIndexRepository.deleteAll();
		operations.add("profiles deleted");
		return operations;
	}

	@Override
	public List<String> updateDataIndex() {
		List<String> operations = new ArrayList<>();
		try {
			List<Requisition> requisitions =requisitionService.retrieveAllRequistions();
			if(requisitions != null && !requisitions.isEmpty()){
			requisitionIndexRepository.save(requisitions);
			operations.add("requistions synched");
			}else{
				operations.add("no requisitions");
			}
			List<Position> positions =   positionService.retrieveAllPositions();
			if(positions != null && !positions.isEmpty()){
				positionIndexRepository.save(positions);
				operations.add("positions synched");
			}else{
				operations.add("no positions");
			}
			List<InterviewDetails> interviewDetails = interviewService.getAllInterviewDetails();
			if(interviewDetails != null && !interviewDetails.isEmpty()){
				interviewIndexRepository.save(interviewDetails);
				operations.add("interview details synched");
			}else{
				operations.add("no interview details");
			}
			List<Profile> profiles = profileService.retrieveAllProfiles();
			if(profiles != null && !profiles.isEmpty()){
				profileIndexRepository.save(profiles);
				operations.add("profiles synched");
			}else{
				operations.add("no profiles");
			}
		} catch (Exception e) {
			e.printStackTrace();
			operations.add(e.getMessage());
			
		}
		return operations;
	}

}
