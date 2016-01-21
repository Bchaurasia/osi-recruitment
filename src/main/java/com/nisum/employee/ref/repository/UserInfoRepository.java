package com.nisum.employee.ref.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.UserInfo;

@Repository
public class UserInfoRepository{

	@Autowired
	private MongoOperations mongoOperations;

	public void registerUserByEmailId(String emailId) {
		mongoOperations.save(createUserInfo(emailId));
	}
	
	public List<UserInfo> retrieveUser() {
		return mongoOperations.findAll(UserInfo.class);
	}
	public List<UserInfo> retrieveUserById(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("emailId").regex(Pattern.compile(userId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		return mongoOperations.find(query, UserInfo.class);
	}
	
	public List<UserInfo> retrieveUserByName(String name) {
		Query query = new Query();
		query.addCriteria(Criteria.where("name").regex(Pattern.compile(name, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		return mongoOperations.find(query, UserInfo.class);
	}
	
	public UserInfo createUserInfo(String userName) {
		List<String> defualtRoles = new ArrayList<String>();
		defualtRoles.add("ROLE_USER");
		UserInfo userInfo = new UserInfo();
		userInfo.setEmailId(userName);
		userInfo.setRoles(defualtRoles);
		return userInfo;
	}
	
	public void updateUser(UserInfo user) {
		Query updateQuery = new Query();
		updateQuery.addCriteria(Criteria.where("emailId").is(user.getEmailId()));
		UserInfo user1 = mongoOperations.findOne(updateQuery, UserInfo.class);
		user1.equals(user) ;
		Update update = new Update();
		update.set("name", user.getName());
		update.set("dob", user.getDob());
		update.set("location", user.getLocation());
		update.set("roles", user.getRoles());
		update.set("skills", user.getSkills());
		update.set("clientName", user.getClientName());
		update.set("mobileNumber", user.getMobileNumber());
		update.set("categories", user.getCategories());
		update.set("timeSlots", user.getTimeSlots());
		update.set("categories", user.getCategories());
		update.set("isNotAvailable", user.getIsNotAvailable());
		update.set("skypeId", user.getSkypeId());
		
		mongoOperations.updateFirst(updateQuery, update, UserInfo.class);
	}		
	
	public List<UserInfo> retrieveUserByClient(String clientName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("clientName").regex(Pattern.compile(clientName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		return mongoOperations.find(query, UserInfo.class);
	}
	
	public List<UserInfo> retrieveUserByRole(String role) {
		Query query = new Query();
		query.addCriteria(Criteria.where("roles").is(role));
		return mongoOperations.find(query, UserInfo.class);
	}
}
