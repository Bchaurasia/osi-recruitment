package com.nisum.employee.ref.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Designation;
import com.nisum.employee.ref.repository.DesignationRepository;;

@Service
public class DesignationService implements IDesignationService{
	
	@Autowired
	DesignationRepository designationRepository;

	
	public ArrayList<Designation> retrieveDesignations() {
		return designationRepository.retrieveDesignations();
	}

	
	public void prepareDesignation(Designation designation) {
			designationRepository.prepareDesignations(designation);
	}

	
	public void updateDesignation(Designation designation) {
		designationRepository.updateDesignations(designation);
	}

	
	public void deleteDesignation(String designation) {
		designationRepository.removeDesignations(designation);
		
	}	
}
