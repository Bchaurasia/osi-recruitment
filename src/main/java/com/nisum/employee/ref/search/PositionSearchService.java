package com.nisum.employee.ref.search;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.Position;

@Service
public class PositionSearchService {
	

	@Autowired
	private PositionIndexRepository positionIndexRepository;
	
	
	public List<Position> getAllPostions() throws Exception {
		Iterable<Position> position = positionIndexRepository.findAll();
		List<Position> positionList = Lists.newArrayList(position);
		return positionList;
	}
	
	public List<Position> getPostionByName(String data) throws Exception {
		List<Position> positionList = positionIndexRepository.findPositionsByDesignationStartingWithOrClientStartingWithAllIgnoreCase(data, data);
		return positionList;
		
	}
	
	public Position addPositionIndex(Position position) throws Exception {
		Position positionData = positionIndexRepository.save(position);
		return positionData;
	}
	
	public List<Position> getPostionByDesignation(String designation) throws Exception {
		List<Position> positionList = positionIndexRepository.findPositionsByDesignationAllIgnoreCase(designation);
		return positionList;
		
	}
	
	
}
