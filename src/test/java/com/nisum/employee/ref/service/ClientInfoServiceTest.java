package com.nisum.employee.ref.service;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.nisum.employee.ref.domain.ClientInfo;
import com.nisum.employee.ref.repository.ClientInfoRepository;

@RunWith(MockitoJUnitRunner.class)
public class ClientInfoServiceTest {
	
	@InjectMocks
	ClientInfoService clientInfoService = new ClientInfoService();
	
	@Mock
	private ClientInfoRepository clientInfoRepository;
	
	@Test
	public void shouldGetClientDetails() throws Exception {			
		
		clientInfoService.getClientDetails();
		
		verify(clientInfoRepository, times(1)).getClientDetails();
	}
	
	@Test
	public void shouldGetClientDetailsByClient() throws Exception {			
		
		clientInfoService.getClientDetailsByClient(any(String.class));
		
		verify(clientInfoRepository, times(1)).getClientDetailsByClient(any(String.class));
	}
	
	@Test
	public void shouldGetClientNames() throws Exception {			
		
		clientInfoService.getClientNames();
		
		verify(clientInfoRepository, times(1)).getClientNames();
	}
	
	@Test
	public void shouldGetInterviewerNames() throws Exception {			
		
/*//		clientInfoService.getClientDetails();
		
		List<String> interviewerNames = Lists.newArrayList();
		List<ClientInfo> clients = Lists.newArrayList(new ClientInfo());
		doReturn(clients).when(clientInfoRepository).getClientDetails();
		
		
		ClientInfo clientInfo1 = new ClientInfo();
		clientInfo1.setClientId("abc");
		clientInfo1.setClientName("abc");
		Interviewer interviewer = new Interviewer();
		List<RoundUser> technicalRound1 = new ArrayList<RoundUser>();
		
		RoundUser roundUser = new RoundUser();
		roundUser.setEmailId("abc@abc.com");
		roundUser.setName("abc");
		ArrayList<String> skillSet = new ArrayList<String>();
		skillSet.add("abc");
		
		technicalRound1.add(roundUser);
		interviewer.setTechnicalRound1(technicalRound1);
		clientInfo1.setInterviewers(interviewer);
		
		clients.add(clientInfo1);
		
		for (ClientInfo clientInfo : clients) {
			Interviewer interviewers = clientInfo.getInterviewers();
			String interviewerName = interviewers.getTechnicalRound1().get(0).getName();
			interviewerNames.add(interviewerName);
		}*/
		clientInfoService.getInterviewerNames();
		verify(clientInfoRepository, times(1)).getClientDetails();
	}
	
	@Test
	public void shouldGetClientById() throws Exception {			
		
		clientInfoService.getClientById(any(String.class));
		
		verify(clientInfoRepository, times(1)).getClientById(any(String.class));
	}
	
	@Test
	public void shouldFetchAllUsers() throws Exception {			
		
		clientInfoService.fetchAllUsers();
		
		verify(clientInfoRepository, times(1)).fetchAllUsers();
	}
	
	@Test
	public void shouldDeleteClient() throws Exception {			
		
		clientInfoService.deleteClient(any(String.class));
		
		verify(clientInfoRepository, times(1)).deleteClient(any(String.class));
	}
	
	@Test
	public void shouldCreateClient() throws Exception {			
		
		clientInfoService.createClient(any(ClientInfo.class));
		
		verify(clientInfoRepository, times(1)).createClient(any(ClientInfo.class));
	}
	
	@Test
	public void shouldUpdateClient() throws Exception {			
		
		clientInfoService.updateClient(any(ClientInfo.class));
		
		verify(clientInfoRepository, times(1)).updateClient(any(ClientInfo.class));
	}

}
