package com.nisum.employee.ref.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.repository.EventRepository;
import com.nisum.employee.ref.repository.SequenceRepository;
@Service
public class EventService implements IEventService {
	@Autowired
	EventRepository eventRepo;
	@Autowired
	private SequenceRepository sequenceRepository;
	@Override	
	public void setEvent(Event event) {
		// TODO Auto-generated method stub
		event.setEventId("EVE_" + sequenceRepository.getNextSequenceId("EVE"));
		event.setTimeStamp(new Date());
		System.out.println(event);
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

}
