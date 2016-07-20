package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.repository.EventRepository;
@Service
public class EventService implements IEventService {
	@Autowired
	EventRepository allNotificationsRepo;
	
	@Override	
	public void setNotification(Event notification) {
		// TODO Auto-generated method stub
		allNotificationsRepo.addNotification(notification);
	}

	@Override
	public List<Event> getNotifications() {
		// TODO Auto-generated method stub
		
		return allNotificationsRepo.retieveAllNotifications();
	}

}
