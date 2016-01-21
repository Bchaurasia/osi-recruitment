package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.ClientInfo;

public interface IClientInfoService {
List<ClientInfo> getClientDetails();
List<String> getClientNames();
//List<String> getInterviewerNames();
List<ClientInfo> getClientDetailsByClient(String clientName);
}
