package com.nisum.employee.ref.search;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.JobCodeReport;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class JobCodeInterviewReportSearchService {

	@Autowired
	private JobCodeInterviewDetailsIndexRepository jobCodeInterviewDetailsIndexRepository;
	
	@Autowired
	private JobCodeInterviewDetailsIndexQueryRepository  queryRepository;
	
	public void saveJobCodeInterviewReport(List<JobCodeReport> jobCodeReport){
		/**/
		try{
			for(JobCodeReport report:jobCodeReport){
				jobCodeInterviewDetailsIndexRepository.save(report);
			}
	//	jobCodeInterviewDetailsIndexRepository.save(jobCodeReport);
		}catch(Exception ex){
			log.error(ex.getMessage());
		}
	}
	
	public List<JobCodeReport> getJobCodeInterviewDetails(String requisitionId){
		List<JobCodeReport> list = null;
		try{
		list =  queryRepository.getJobCodeInterviewDetails(requisitionId);
		}catch(Exception ex){
			log.error(ex.getMessage());
		}
		return list;
	}
}
