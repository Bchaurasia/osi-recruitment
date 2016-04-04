package com.nisum.employee.ref.search;
import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nisum.employee.ref.domain.Requisition;

public interface RequisitionIndexRepository extends ElasticsearchRepository<Requisition, String> {

	List<Requisition> findByPositionStartingWithOrClientStartingWithAllIgnoreCase(String position, String client);
	Requisition findByRequisitionIdStartingWithAllIgnoreCase(String requisitionId);
}