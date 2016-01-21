package com.nisum.employee.ref.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.ClientInfo;
import com.nisum.employee.ref.domain.UserInfo;

@Repository
public class ClientInfoRepository{
	
	private static final String _ID = "_id";
	
	@Autowired
	private MongoOperations mongoOperations;

	public List<ClientInfo> getClientDetails() {
		return mongoOperations.findAll(ClientInfo.class);
	}
	
	public List<ClientInfo> getClientDetailsByClient(String clientName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("clientName").regex(Pattern.compile(clientName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<ClientInfo> clientInfo = mongoOperations.find(query, ClientInfo.class);
		return clientInfo;
	}

	public List<String> getClientNames() {
		List<String> clientNames = new ArrayList<String>();
		
		List<ClientInfo> clients = mongoOperations.findAll(ClientInfo.class);
		for (ClientInfo clientInfo : clients) {
			String clientName = clientInfo.getClientName();
			clientNames.add(clientName);
		}
		return clientNames;
	}
	
	public List<ClientInfo> getClientById(String clientId) {
		Query query = new Query();
		query.addCriteria(Criteria.where(_ID).regex(Pattern.compile(clientId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<ClientInfo> clientInfo = mongoOperations.find(query, ClientInfo.class);
		return clientInfo;
	}
	
	//---Admin
	
	public List<UserInfo> fetchAllUsers() {
		List<UserInfo> allUsers = mongoOperations.findAll(UserInfo.class);
		return allUsers;
	}
	
	public void deleteClient(String client) {
		Query query = new Query();
		query.addCriteria(Criteria.where(_ID).regex(client));
		ClientInfo clientInfo = mongoOperations.findOne(query, ClientInfo.class);
		mongoOperations.remove(clientInfo);
	}
	
	public void createClient(ClientInfo clientInfo) {
		mongoOperations.save(clientInfo);
	}
	
	public void updateClient(ClientInfo clientInfo) {
		String collection = "clientInfo";
		Query query = new Query();
		query.addCriteria(Criteria.where(_ID).regex(clientInfo.getClientId()));
		mongoOperations.save(clientInfo, collection);
	}
}
