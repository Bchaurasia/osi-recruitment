package com.nisum.employee.ref.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.UserNotification;

@Repository
public class UserNotificationRepository {
	
	@Autowired
	private MongoOperations mongoOperations;
	
	public List<UserNotification> retrieveNotifications(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId).and("read").is("No"));
		List<UserNotification> userNotification = mongoOperations.find(query, UserNotification.class);
		return userNotification;
	}
	
	public List<UserNotification> retrieveNoNotifications(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId).and("read").is("Yes"));
		List<UserNotification> userNotification = mongoOperations.find(query, UserNotification.class);
		return userNotification;
	}
	
	public void readNotifications(String userId, String message) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId).and("message").is(message));
		Update update = new Update();
		update.set("read", "Yes");
		mongoOperations.updateFirst(query, update, UserNotification.class);
	}
	
	public void createNotifications(UserNotification userNotification) {
		//mongoOperations.save(userNotification);
		mongoOperations.save(userNotification, "UserNotification");
	}
	
	public long getUserNotificationCount(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId).and("read").is("No"));
		long userNotification = mongoOperations.count(query, UserNotification.class);
		return userNotification;
	}
}
