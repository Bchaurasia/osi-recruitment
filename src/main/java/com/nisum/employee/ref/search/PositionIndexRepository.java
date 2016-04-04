package com.nisum.employee.ref.search;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nisum.employee.ref.domain.Position;

public interface PositionIndexRepository extends ElasticsearchRepository<Position, String>{

    List<Position> findPositionsByDesignationStartingWithOrClientStartingWithAllIgnoreCase(String designation, String client);
    List<Position> findPositionsByDesignationAllIgnoreCase(String designation);
}


