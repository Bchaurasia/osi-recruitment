package com.nisum.employee.ref.search;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nisum.employee.ref.domain.Position;

public interface PositionIndexRepository extends ElasticsearchRepository<Position, String>{

}
