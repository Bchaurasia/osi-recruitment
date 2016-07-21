package com.nisum.employee.ref.repository;

import java.util.List;

import org.apache.lucene.search.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Event;

@Repository
public class EventRepository {
	
	private static final int RECORD_COUNT = 20;

	@Autowired
	private MongoOperations mongoOperations;

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public void addEvent(Event event){
		mongoOperations.save(event);
	}

	public List<Event> retieveEvents(){
		
		
		List<Event>allEvents=mongoOperations.findAll(Event.class);		
		return allEvents;
		
	}
}
