package com.nisum.employee.ref.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.nisum.employee.ref.domain.Event;

import java.util.List;

@Repository
public class EventRepository {
	
	@Autowired
	private MongoOperations mongoOperations;


	
	public void addEvent(Event event){
		mongoOperations.save(event);
	}


public List<Event> retieveEvents(){	
	
	Query query = new Query();	
	query.with(new Sort(new Order(Sort.Direction.DESC, "createdTimeStamp")));
	query.limit(10);
	List<Event> allEvents=mongoOperations.find(query,Event.class);
	return allEvents;

	}
public List<Event> retieveEventsForGeneral(){	
	
	Query query = new Query();
	query.addCriteria(Criteria.where("category").is("General"));
	query.with(new Sort(new Order(Sort.Direction.DESC, "createdTimeStamp")));
	query.limit(10);	
	List<Event> allEvents=mongoOperations.find(query,Event.class);
	return allEvents;

	}
}
