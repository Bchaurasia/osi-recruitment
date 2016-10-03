package com.nisum.employee.ref.search;

import java.util.List;

import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.JobCodeReport;

@Repository
public class JobCodeInterviewDetailsIndexQueryRepository{
	
	@Autowired
	private ElasticsearchTemplate elasticsearchTemplate;
	
   List<JobCodeReport> getJobCodeInterviewDetails(String query){
	   QueryBuilder qb = QueryBuilders.multiMatchQuery(query, "requisitionId");
		SearchQuery searchQuery = new NativeSearchQueryBuilder().withQuery(qb).withPageable(new PageRequest(0, 100))
				.build();
		return elasticsearchTemplate.queryForList(searchQuery, JobCodeReport.class);
	   
   }
}