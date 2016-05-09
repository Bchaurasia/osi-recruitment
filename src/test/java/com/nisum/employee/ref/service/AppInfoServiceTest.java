package com.nisum.employee.ref.service;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.nisum.employee.ref.domain.InfoEntity;
import com.nisum.employee.ref.repository.InfoRepository;

@RunWith(MockitoJUnitRunner.class)
public class AppInfoServiceTest {
	
	@InjectMocks
	AppInfoService appInfoService = new AppInfoService();
	
	@Mock
	private InfoRepository infoRepository;
	
	@Test
	public void shouldRetrieveSkills() throws Exception {			
		
		appInfoService.retrieveSkills();
		
		verify(infoRepository, times(1)).retrieveSkills();
	}
	
	@Test
	public void shouldPrepareInfo() throws Exception {			
		
		appInfoService.prepareInfo(any(InfoEntity.class));
		
		verify(infoRepository, times(1)).prepareInfo(any(InfoEntity.class));
	}
	
	@Test
	public void shoulUpdateInfo() throws Exception {			
		appInfoService.updateInfo(any(InfoEntity.class));
		
		verify(infoRepository, times(1)).updateInfo(any(InfoEntity.class));
	}	
	
	@Test
	public void shoulUpdateDesigInfo() throws Exception {			
		appInfoService.updateInfo(any(InfoEntity.class));
		
		verify(infoRepository, times(1)).updateInfo(any(InfoEntity.class));
	}
	
	@Test
	public void shoulUpdateInterviewRoundsInfo() throws Exception {			
		appInfoService.updateInfo(any(InfoEntity.class));
		
		verify(infoRepository, times(1)).updateInfo(any(InfoEntity.class));
	}
	
}
