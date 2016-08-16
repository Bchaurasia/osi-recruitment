package com.nisum.employee.ref.repository;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Requisition;

@Repository
public class RequisitionRepository {

	@Autowired
	private MongoOperations mongoOperations;
	@Autowired
	private SequenceRepository sequenceRepository;

	public Requisition prepareRequisition(Requisition requisition) {
		requisition.setRequisitionId("REQ_" + sequenceRepository.getNextSequenceId("REQ"));
		requisition.setCreatedDate(new Date());
		mongoOperations.save(requisition);
		return requisition;
	}

	public Requisition updateRequisition(Requisition requisition) {
		requisition.setUpdatedDate(new Date());
		mongoOperations.save(requisition);
		return requisition;
	}

	public List<Requisition> retrieveAllRequisitions() {
		List<Requisition> requistionDetails = mongoOperations.findAll(Requisition.class);
		return requistionDetails;
	}

	public Requisition retrieveRequisitionBasedOnId(String requisitionId) {
		Requisition requistionDetails = mongoOperations.findById(requisitionId, Requisition.class);
		return requistionDetails;
	}
	
	public void changeStatusByReqId(String requisitionId, String published, String jobCode) {
		Query query = new Query();
		query.addCriteria(Criteria.where("requisitionId").is(requisitionId));
		query.addCriteria(Criteria.where("jobcode").is(jobCode));
		Position req = mongoOperations.findOne(query, Position.class);
		if (req != null) {
		query.fields().include("requisitionId");
		query.fields().include("jobcode");
		Update update = new Update();

		/*update.set("status", published);*/
		update.set("publishStatus", true);
		mongoOperations.updateFirst(query, update, Position.class);
		} else {
		throw new DataIntegrityViolationException(
		"Job Not Published doesn't exists.");
		}

		}
	
	public Position retrievePositionBasedOnId(String jobCode) {
		Position position = mongoOperations.findById(jobCode, Position.class);
		return position;
	}

}