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
	
	
	public List<Position> getAllPostions(){
		Iterable<Position> position = positionIndexRepository.findAll();
		List<Position> positionList = Lists.newArrayList(position);
		return positionList;
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
