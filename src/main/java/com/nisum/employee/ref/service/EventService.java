package com.nisum.employee.ref.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.EventRepository;
import com.nisum.employee.ref.repository.SequenceRepository;
import com.nisum.employee.ref.repository.UserInfoRepository;
@Service
public class EventService implements IEventService {
	@Autowired
	EventRepository eventRepo;
	@Autowired
	private SequenceRepository sequenceRepository;
	@Autowired
	private UserInfoRepository userInfoRepository;
	@Override	
	public void setEvent(Event event) {
		// TODO Auto-generated method stub
		event.setEventId("EVE_" + sequenceRepository.getNextSequenceId("EVE"));
		event.setCreatedTimeStamp(new Date());
		List<UserInfo> userInfo=userInfoRepository.retrieveUserById(event.getEmailId());
		for(UserInfo user:userInfo){
			if(user.getName()==""||user.getName()==null)
			{
				event.setUsername(event.getEmailId());	
			
			}
			else
			{
				event.setUsername(user.getName());
				
			}
		}
		//System.out.println(event);
		try{
			eventRepo.addEvent(event);
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		
		
		
	}

	@Override
	public List<Event> getEvents() {
		// TODO Auto-generated method stub
		return eventRepo.retieveEvents();
	
	}
	@Override
		public List<Event> getUserEvents(String emailId) {
		// TODO Auto-generated method stub
		return eventRepo.retieveUserEvents(emailId);
	
	}
	
	@Override
	public List<Event> getEventsForGeneral() {
		// TODO Auto-generated method stub
		return eventRepo.retieveEventsForGeneral();
	
	}

}
