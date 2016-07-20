package com.nisum.employee.ref.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Event;

import java.util.List;

@Repository
public class EventRepository {
	
	@Autowired
	private MongoOperations mongoOperations;

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public void addNotification(Event notification){
		mongoOperations.save(notification);
	}

	public List<Event> retieveAllNotifications(){
		List<Event>allNotifications=mongoOperations.findAll(Event.class);		
		return allNotifications;
		
	}
}
