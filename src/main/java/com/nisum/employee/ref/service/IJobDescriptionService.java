package com.nisum.employee.ref.service;

import java.util.ArrayList;

import com.nisum.employee.ref.domain.JobDescription;

public interface IJobDescriptionService {
	ArrayList<JobDescription> retrieveJobDescriptions();
	ArrayList<JobDescription> retrieveJobDescriptionsById(String id);
	void prepareJobDescription(JobDescription jobDescription);
	void updateJobDescription(JobDescription jobDescription);
	void deleteJobDescription(String jobDescription);
	ArrayList<JobDescription> validateJDName(String jdName);
}