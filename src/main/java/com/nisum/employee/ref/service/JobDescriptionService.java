package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.JobDescription;
import com.nisum.employee.ref.repository.JobDescriptionRepository;;

@Service
public class JobDescriptionService implements IJobDescriptionService{
	
	@Autowired
	JobDescriptionRepository jobDescriptionRepository;
	
	@Override
	public ArrayList<JobDescription> retrieveJobDescriptions() {
		return jobDescriptionRepository.retrieveJobDescriptions();
	}

	@Override
	public void prepareJobDescription(JobDescription jobDescription) {
			jobDescriptionRepository.prepareJobDescriptions(jobDescription);
	}

	@Override
	public void updateJobDescription(JobDescription jobDescription) {
		jobDescriptionRepository.updateJobDescriptions(jobDescription);
	}
	@Override
	public void deleteJobDescription(String jobDescription) {
		jobDescriptionRepository.removeJobDescriptions(jobDescription);
		
	}
	@Override
	public ArrayList<JobDescription> validateJDName(String jdName) {
		return jobDescriptionRepository.getJDById(jdName);
	}

	@Override
	public ArrayList<JobDescription> retrieveJobDescriptionsById(String id) {
		return jobDescriptionRepository.getJDById(id);
	}
	
	@Override
	public List<JobDescription> retrieveJobDescriptionsByClient(String client) {
		return jobDescriptionRepository.getJDByClient(client);
	}
}