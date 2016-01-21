package com.nisum.employee.ref.repository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.SequenceId;
import com.nisum.employee.ref.service.SequenceException;

@Slf4j
@Repository
public class SequenceRepository {

	@Autowired
	private MongoOperations mongoOperation;

	public long getNextSequenceId(String key) throws SequenceException {
		
		log.info("Searching for sequenceId for a key :{}", key);
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(key));

		mongoOperation.findOne(query, SequenceId.class);

		Update update = new Update();
		update.inc("seq", 1);

		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);

		SequenceId seqId = mongoOperation.findAndModify(query, update, options, SequenceId.class);

		if (seqId == null) {
			log.error("No sequenceId found for the  key:" + key );
			throw new SequenceException("Unable to get sequence id for key : "+ key);
		}

		return seqId.getSeq();

	}

}
