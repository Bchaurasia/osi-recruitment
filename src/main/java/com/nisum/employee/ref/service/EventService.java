package com.nisum.employee.ref.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.EventRepository;
import com.nisum.employee.ref.repository.SequenceRepository;

import groovy.util.logging.Slf4j;
@Service
@Slf4j
public class EventService implements IEventService {
	@Autowired
	EventRepository eventRepo;
	@Autowired
	private SequenceRepository sequenceRepository;
	
	@Autowired
	UserService userService;
	
	@Override	
	public void setEvent(Event event) {
		UserInfo user = userService.retrieveUserById(event.getEmailId());
		event.setUsername(user.getName());
		event.setEventId("EVE_" + sequenceRepository.getNextSequenceId("EVE"));
		event.setCreatedTimeStamp(new Date());
		try{
			eventRepo.addEvent(event);
		}catch(Exception e){
			//logger(e.getMessage());
		}
	}

	@Override
	public List<Event> getEvents() {
		return eventRepo.retieveEvents();
	}

	@Override
	public List<Event> getEventsByCategory() {
		return null;
	}
}
