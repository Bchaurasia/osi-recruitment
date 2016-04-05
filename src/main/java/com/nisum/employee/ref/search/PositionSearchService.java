package com.nisum.employee.ref.search;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.Position;

import groovy.util.logging.Slf4j;

@Slf4j
@Service
public class PositionSearchService {
	
	private final Logger log = LoggerFactory.getLogger(PositionSearchService.class);
	@Autowired
	private PositionIndexRepository positionIndexRepository;
	
	
	public List<Position> getAllPostions() {
		try {
			Iterable<Position> position = positionIndexRepository.findAll();
			List<Position> positionList = Lists.newArrayList(position);
			return positionList;
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return null;
	}
	
	public List<Position> getPostionByName(String data) throws Exception {
		List<Position> positionList = positionIndexRepository.findPositionsByDesignationStartingWithOrClientStartingWithAllIgnoreCase(data, data);
		return positionList;
		
	}
	
	public Position addPositionIndex(Position position){
		Position positionData = positionIndexRepository.save(position);
		return positionData;
	}
	
	
	public void updatePositionIndex(Position position) throws Exception {
			positionIndexRepository.exists(position.getJobcode());
			positionIndexRepository.delete(position.getJobcode());
			addPositionIndex(position);
	}
	
	
	public List<Position> getPostionByDesignation(String designation) throws Exception {
		List<Position> positionList = positionIndexRepository.findPositionsByDesignationAllIgnoreCase(designation);
		return positionList;
		
	}
	
	
}
