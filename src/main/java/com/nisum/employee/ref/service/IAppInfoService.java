package com.nisum.employee.ref.service;

import java.util.ArrayList;

import com.nisum.employee.ref.domain.InfoEntity;

public interface IAppInfoService {
	ArrayList<InfoEntity> retrieveSkills();
	void prepareInfo(InfoEntity info);
	void updateInfo(InfoEntity info);
	void updateDesigInfo(InfoEntity info);
	void updateInterviewRoundsInfo(InfoEntity info);
}
