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

import com.nisum.employee.ref.domain.Position;

@Repository
public class ElasticsearchRepository {
	
	@Autowired
    private ElasticsearchTemplate elasticsearchTemplate;
	
	@Autowired
	private MongoOperations mongoOperations;
	
	public void indexPositionObject(Position position){
		elasticsearchTemplate.createIndex(Position.class);
		IndexQuery indexQuery = new IndexQuery();
		indexQuery.setId(position.getJobcode());
		indexQuery.setObject(position);
		elasticsearchTemplate.index(indexQuery);
		elasticsearchTemplate.refresh(Position.class, true);
	}
	
	public List<Position> searchPosition(String client){
		//QueryBuilder queryBuilder = QueryBuilders.matchQuery("client",client);
		QueryBuilder queryBuilder = QueryBuilders.queryString("*"+client+"*");
		
		SearchQuery searchQuery = new NativeSearchQueryBuilder()
        .withQuery(queryBuilder)
        .build();
        Page<Position> sampleEntities = elasticsearchTemplate.queryForPage(searchQuery,Position.class);
		return sampleEntities.getContent();		
	}
	
	public List<Position> retrieveAllPositions(){
		
		SearchQuery searchQuery = new NativeSearchQueryBuilder()
        .withQuery(QueryBuilders.matchAllQuery())
        .build();
        Page<Position> sampleEntities = elasticsearchTemplate.queryForPage(searchQuery,Position.class);
		return sampleEntities.getContent();		
	}
}
