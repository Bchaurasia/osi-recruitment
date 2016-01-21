package com.nisum.employee.ref.service;

import java.util.Arrays;
import java.util.List;

import spock.lang.Shared
import spock.lang.Specification

import com.nisum.employee.ref.domain.ClientInfo
import com.nisum.employee.ref.domain.Interviewer
import com.nisum.employee.ref.domain.RoundUser;
import com.nisum.employee.ref.repository.ClientInfoRepository

class ClientInfoServiceSpec extends Specification {

	@Shared
	def ClientInfoService clientInfoService = new ClientInfoService();

	ClientInfoRepository clientInfoRepository = Mock(ClientInfoRepository);

	void setup() {
		clientInfoService.clientInfoRepository = clientInfoRepository;
	}

	def "should return client info"(){

		given: "mock the repo call to receive some test data"
		clientInfoRepository.getClientDetails() >> [new ClientInfo(), new ClientInfo()]

		when: "call the service"
		List<ClientInfo> response = clientInfoService.getClientDetails();

		then: "the repo should call once"
		response.size() == 2;
	}

	def "filter interviewer names for all technical rounds"(){
		given: "we have clientInfo in repository"
		clientInfoRepository.getClientDetails() >> [prepareClientInfo("Gap"), prepareClientInfo("Macys")]

		when: "call the interviewers name service"
		List<String> response = clientInfoService.getInterviewerNames();

		then: "we should see all expected interviewer names"
		response.size() == 2;
	}


	private ClientInfo prepareClientInfo(String clientName) {
		ClientInfo clientInfo = new ClientInfo()
				.builder()
				.clientName(clientName)
				.interviewers(
				new Interviewer()
				.builder()
				.technicalRound1(
				Arrays.asList(new RoundUser()
				.builder()
				.name("name2").build()))
				.technicalRound2(
				Arrays.asList(new RoundUser()
				.builder()
				.name("name4").build()))
				.build()).build();


		return clientInfo;
	}
}
