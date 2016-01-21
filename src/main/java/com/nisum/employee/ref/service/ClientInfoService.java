package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.ClientInfo;
import com.nisum.employee.ref.domain.Interviewer;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.ClientInfoRepository;

@Service
public class ClientInfoService implements IClientInfoService{

	@Autowired
	@Setter
	@Getter
	ClientInfoRepository clientInfoRepository;
	

	public List<ClientInfo> getClientDetails() {
		return clientInfoRepository.getClientDetails();
	}
	
	public List<ClientInfo> getClientDetailsByClient(String clientName) {
		return clientInfoRepository.getClientDetailsByClient(clientName);
	}

	public List<String> getClientNames() {
		return clientInfoRepository.getClientNames();
	}
	
	public List<String> getInterviewerNames() {
		List<String> interviewerNames = new ArrayList<String>();
		List<ClientInfo> clients = (List<ClientInfo>) clientInfoRepository.getClientDetails();
		for (ClientInfo clientInfo : clients) {
			Interviewer interviewers = clientInfo.getInterviewers();
			String interviewerName = interviewers.getTechnicalRound1().get(0).getName();
			interviewerNames.add(interviewerName);
		}
		return interviewerNames;
	}
	
	public List<ClientInfo> getClientById(String clientId) {
		return clientInfoRepository.getClientById(clientId);
	}
	
	//---Admin
	
	public List<UserInfo> fetchAllUsers() {
		return clientInfoRepository.fetchAllUsers();
	}
	
	public void deleteClient(String client) {
		 clientInfoRepository.deleteClient(client);
	}
	
	public void createClient(ClientInfo clientInfo) {
		clientInfoRepository.createClient(clientInfo);
	}
	
	public void updateClient(ClientInfo clientInfo) {
		clientInfoRepository.updateClient(clientInfo);
	}
}
