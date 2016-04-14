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
	
	private static final String OSI = "OSI";
	private static final String ROLE_USER = "ROLE_USER";
	
	@Autowired
	private MongoOperations mongoOperations;

	public void registerUserByEmailId(UserInfo userInfo) {
		mongoOperations.save(createOSILdapUserInfo(userInfo));
	}
	
	public List<UserInfo> retrieveUser() {
		return mongoOperations.findAll(UserInfo.class);
	}
	public boolean isUserExists(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").exists(true).orOperator(Criteria.where("emailId").is(userId)));
		return mongoOperations.exists(query, UserInfo.class);
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
		defualtRoles.add(ROLE_USER);
		UserInfo userInfo = new UserInfo();
		userInfo.setEmailId(userName);
		userInfo.setName(userName);
		userInfo.setRoles(defualtRoles);
		return userInfo;
	}
	
	public UserInfo createOSILdapUserInfo(UserInfo userInfo) {
		List<String> defualtRoles = new ArrayList<String>();
		defualtRoles.add(ROLE_USER);
		//UserInfo userInfo = new UserInfo();
		userInfo.setEmailId(userInfo.getEmailId());
		userInfo.setName(userInfo.getName());
		userInfo.setCompany(OSI);
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
