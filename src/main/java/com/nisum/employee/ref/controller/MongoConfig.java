package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Component;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

@Component
public class MongoConfig extends AbstractMongoConfiguration{

	@Value("${db.name}")
	private String mongoDbName;

	@Value("${db.mongo.client}")
	private String mongoClient;


	@Bean
	public GridFsTemplate gridFsTemplate() throws Exception {
		return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter());
	}

	@Override
	protected String getDatabaseName() {
		return mongoDbName;
	}

	@Override
	public Mongo mongo() throws Exception {
		return new MongoClient(mongoClient);
	}

}
