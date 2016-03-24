package com.nisum.employee.ref.repository;

import java.util.List;

import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Profile;

@Repository
public class ProfileSearchRepository {
	
	@Autowired
    private ElasticsearchTemplate elasticsearchTemplate;
	
	@Autowired
	private MongoOperations mongoOperations;
	
	public void indexProfileObject(Profile profile){
		elasticsearchTemplate.createIndex(Profile.class);
		IndexQuery indexQuery = new IndexQuery();
		indexQuery.setId(profile.getEmailId());
		indexQuery.setObject(profile);
		elasticsearchTemplate.index(indexQuery);
		elasticsearchTemplate.refresh(Profile.class, true);
	}
	
	public List<Profile> searchProfile(String email){
		//QueryBuilder queryBuilder = QueryBuilders.matchQuery("client",client);
		QueryBuilder queryBuilder = QueryBuilders.queryString("*"+email+"*");
		
		SearchQuery searchQuery = new NativeSearchQueryBuilder()
        .withQuery(queryBuilder)
        .build();
        Page<Profile> sampleEntities = elasticsearchTemplate.queryForPage(searchQuery,Profile.class);
		return sampleEntities.getContent();		
	}
	
	public List<Profile> retrieveAllProfile(){
		
		SearchQuery searchQuery = new NativeSearchQueryBuilder()
        .withQuery(QueryBuilders.matchAllQuery())
        .build();
        Page<Profile> sampleEntities = elasticsearchTemplate.queryForPage(searchQuery,Profile.class);
		return sampleEntities.getContent();		
	}
}
