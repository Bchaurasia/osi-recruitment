package com.nisum.employee.ref.repository;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

import java.util.List;
import java.util.regex.Pattern;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.PositionAggregate;


@Repository
public class PositionRepository {

	private static final String _ID = "_id";

	
	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public void save(Position position) {
		mongoOperations.save(position);
	}

	public void preparePosition(Position position) {
		mongoOperations.save(position);
	}
	
	public void updatePosition(Position position) {
		Query query = new Query();
		query.addCriteria(Criteria.where("jobcode").is(position.getJobcode()));
		query.fields().include("jobcode");
		Update update = new Update();
		update.set("designation",position.getDesignation());
		update.set("minExpYear",position.getMinExpYear());
		update.set("maxExpYear",position.getMaxExpYear());
		update.set("primarySkills", position.getPrimarySkills());
		update.set("secondarySkills",position.getSecondarySkills());
		update.set("interviewRounds",position.getInterviewRounds());
		update.set("jobProfile",position.getJobProfile());
		update.set("location",position.getLocation());
		update.set("noOfPositions",position.getNoOfPositions());
		update.set("client",position.getClient());
		update.set("lastModifiedDate",new DateTime());
		update.set("hiringManager", position.getHiringManager());
		update.set("priority", position.getPriority());
		update.set("interviewer", position.getInterviewer());
		update.set("jobType", position.getJobType());
		update.set("salary", position.getSalary());
		update.set("status", position.getStatus());
		mongoOperations.updateFirst(query, update, Position.class);
	}

	public List<Position> retrievePositionByClient(String client) {
		Query query = new Query();
		query.addCriteria(Criteria.where("client").regex(Pattern.compile(client, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<Position> positionDatails = mongoOperations.find(query, Position.class);
		return positionDatails;
	}
	
	public List<Position> retrieveAllPositions() {
		List<Position> positionDatails = mongoOperations.findAll(Position.class);
		return positionDatails;
	}

	public List<Position> retrievePositionsbasedOnDesignation(String designation) {
		Query query = new Query();
		query.addCriteria(Criteria.where("designation").is(designation));
		List<Position> positionDatails = mongoOperations.find(query, Position.class);
		return positionDatails;
	}
	
	public Position retrievePositionsbasedOnJobCode(String jobcode) {
		Query query = new Query();
		query.addCriteria(Criteria.where(_ID).regex(jobcode));
		Position positionDetail = mongoOperations.findOne(query, Position.class);
		return positionDetail;
	}
	
	public Position deletePositionBasedOnJC(String jobcode) {
		Query query = new Query();
		query.addCriteria(Criteria.where(_ID).regex(jobcode));
		return mongoOperations.findAndRemove(query, Position.class);
	}
	
	public List<Position> retrievePositionbasedOnLocation(String location) {
		Query query = new Query();
		query.addCriteria(Criteria.where("location").regex(location));
		List<Position> positionDetail = mongoOperations.find(query, Position.class);
		return positionDetail;
	}
	
	public List<PositionAggregate> retrieveAllPositionsAggregate() {
		Aggregation agg = newAggregation(group("designation").count().as("total"),
				project("total").and("designation").previousOperation(),
				sort(Sort.Direction.DESC, "total"));
		
		AggregationResults<PositionAggregate> groupResults = mongoTemplate.aggregate(agg, Position.class, PositionAggregate.class);
		List<PositionAggregate> result = groupResults.getMappedResults();
		
		for (PositionAggregate positionAggregate : result) {
			int noOfRequiredPositions = 0;
			Query query = new Query();
			query.addCriteria(Criteria.where("designation").regex(positionAggregate.getDesignation()));
			List<Position> positions = mongoOperations.find(query, Position.class);
			for (Position position : positions) {
				noOfRequiredPositions += position.getNoOfPositions();
			}
			positionAggregate.setTotal(noOfRequiredPositions);
		}
		
		return result;
	}

}
