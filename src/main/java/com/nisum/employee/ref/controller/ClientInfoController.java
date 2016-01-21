package com.nisum.employee.ref.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.ClientInfo;
import com.nisum.employee.ref.domain.ResponseVO;
import com.nisum.employee.ref.service.ClientInfoService;

@Controller
public class ClientInfoController {

	@Autowired(required=false)
	private ClientInfoService clientInfoService;
	
	@RequestMapping(value = "/clientNames", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getClients() {
		List<String> clients = clientInfoService.getClientNames();
		return new ResponseEntity<List<String>>(clients, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/clientInfo", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getClientInfo(@RequestParam(value = "clientName", required = false) String clientName) {
		List<ClientInfo> clients = null;
		if (clientName != null && !clientName.isEmpty()) {
		 clients = clientInfoService.getClientDetailsByClient(clientName);
		}else{
		 clients = clientInfoService.getClientDetails();
		}
		return !clients.isEmpty() ? new ResponseEntity<List<ClientInfo>>(clients, HttpStatus.OK) : new ResponseEntity<String>("Client not found", HttpStatus.NOT_FOUND) ;
	}
	
	@RequestMapping(value = "/interviewerNames", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getInterviewerNames() {
		List<String> interviewerNames = clientInfoService.getInterviewerNames();
		return new ResponseEntity<List<String>>(interviewerNames, HttpStatus.OK);
	}

	@RequestMapping(value = "/getClientById", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getClientById(@RequestParam(value = "clientId", required = true) String clientId) {
		List<ClientInfo> client = clientInfoService.getClientById(clientId);
		return new ResponseEntity<List<ClientInfo>>(client, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/clientInfo", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteClient(@RequestParam(value = "clientId", required = true) String clientId) {
		clientInfoService.deleteClient(clientId);
		
		ResponseVO<String>  resononse = new ResponseVO<String>();
		resononse.setMessage(clientId + " Id Client has been removed successfully.");
		return new ResponseEntity<ResponseVO<String>>(resononse, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/clientInfo", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createClient(@RequestBody ClientInfo clientInfo) {
		clientInfoService.createClient(clientInfo);
		return new ResponseEntity<ClientInfo>(clientInfo, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN"})
	@RequestMapping(value = "/clientInfo", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<String> updateClient(@RequestBody ClientInfo clientInfo) {
		clientInfoService.updateClient(clientInfo);
		String jsonObj="{\"msg\":\"Client Updated Successfully\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.ACCEPTED);
	}
}
