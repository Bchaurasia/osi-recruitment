package com.nisum.employee.ref.search;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nisum.employee.ref.domain.JobCodeReport;

public interface JobCodeInterviewDetailsIndexRepository extends ElasticsearchRepository<JobCodeReport, String>{

}
