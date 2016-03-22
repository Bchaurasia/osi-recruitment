package com.nisum.employee.ref.repository;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Requisition;

@Repository
public class RequisitionRepository {

	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private SequenceRepository sequenceRepository;

	public void prepareRequisition(Requisition requisition) {
		requisition.setRequisitionId("REQ_"+sequenceRepository.getNextSequenceId("REQ"));
		mongoOperations.save(requisition);
	}

	public void updateRequisition(Requisition requisition) {
		Query query = new Query();
		query.addCriteria(Criteria.where("requisitionId").is(requisition.getRequisitionId()));
		Requisition req = mongoOperations.findOne(query, Requisition.class);
		if (req != null) {
			query.fields().include("requisitionId");
			Update update = new Update();
			update.set("position", requisition.getPosition());
			update.set("noOfPositions", requisition.getNoOfPositions());
			update.set("client", requisition.getClient());
			update.set("minExpYear", requisition.getMinExpYear());
			update.set("maxExpYear", requisition.getMaxExpYear());
			update.set("requistionDate", requisition.getRequisitionDate());
			update.set("targetDate", requisition.getTargetDate());
			update.set("location", requisition.getLocation());
			update.set("qualifications", requisition.getQualifications());
			update.set("skillType", requisition.getSkillType());
			update.set("approval1", requisition.getApproval1());
			update.set("approval2", requisition.getApproval2());
			update.set("jobDescription", requisition.getJobDescription());
			update.set("comment", requisition.getComment());
			update.set("requisitionManager", requisition.getRequisitionManager());
			update.set("createdBy", requisition.getCreatedBy());
			mongoOperations.updateFirst(query, update, Requisition.class);
		} else {
			throw new DataIntegrityViolationException(
					"requisitionId doesn't exists.");
		}

	}
	
	public List<Requisition> retrieveAllRequisitions() {
		List<Requisition> requistionDetails = mongoOperations
				.findAll(Requisition.class);
		return requistionDetails;
	}

	public Requisition retrieveRequisitionBasedOnId(String requisitionId) {
		Requisition requistionDetails = mongoOperations
				.findById(requisitionId, Requisition.class);
		return requistionDetails;
	}


	public List<Requisition> retrieveRequisitionsByClient(String client) {
		Query query = new Query();
		query.addCriteria(Criteria.where("client").regex(
				Pattern.compile(client, Pattern.CASE_INSENSITIVE
						| Pattern.UNICODE_CASE)));
		List<Requisition> requistionDetails = mongoOperations.find(query,
				Requisition.class);
		return requistionDetails;
	}

	
	public List<Requisition> retrieveRequisitionsByPosition(String position) {
		Query query = new Query();
		query.addCriteria(Criteria.where("position").regex(
				Pattern.compile(position, Pattern.UNICODE_CASE)));
		List<Requisition> requistionDetails = mongoOperations.find(query,
				Requisition.class);
		return requistionDetails;
	}

}