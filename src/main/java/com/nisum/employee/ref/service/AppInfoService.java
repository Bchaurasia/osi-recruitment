package com.nisum.employee.ref.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.InfoEntity;
import com.nisum.employee.ref.repository.InfoRepository;

@Service
public class AppInfoService implements IAppInfoService{
	
	@Autowired
	 InfoRepository skillsRequired;
	
	@Override
	public ArrayList<InfoEntity> retrieveSkills() {
		return skillsRequired.retrieveSkills();
	}

	@Override
	public void prepareInfo(InfoEntity info) {
		skillsRequired.prepareInfo(info);
	}

	@Override
	public void updateInfo(InfoEntity info) {
		skillsRequired.updateInfo(info);
	}

	@Override
	public void updateDesigInfo(InfoEntity info) {
		skillsRequired.updateInfo(info);
		
	}

	@Override
	public void updateInterviewRoundsInfo(InfoEntity info) {
		skillsRequired.updateInfo(info);
	}
}
