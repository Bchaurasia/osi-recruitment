package com.nisum.employee.ref.search;

import groovy.util.logging.Slf4j;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.nisum.employee.ref.domain.Position;

@Slf4j
@Service
public class PositionSearchService {
	
	private final Logger log = LoggerFactory.getLogger(PositionSearchService.class);
	@Autowired
	private PositionIndexRepository positionIndexRepository;
	
	
	public List<Position> getAllPostions() {
			Iterable<Position> position = positionIndexRepository.findAll();
			List<Position> positionList = Lists.newArrayList(position);
		try{
			Collections.sort(positionList,new Comparator<Position>(){
				public int compare(Position o1, Position o2){
					return o2.getUpdatedDate().compareTo(o1.getUpdatedDate());
				}});
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return positionList;
	}
	
	public List<Position> getPostionByDesignationOrClient(String data) throws Exception {
		List<Position> positionList = positionIndexRepository.findPositionsByDesignationStartingWithOrClientStartingWithAllIgnoreCase(data, data);
		if(positionList.isEmpty()){
			Position position = positionIndexRepository.findOne(data);
			positionList = new ArrayList<Position>();
			positionList.add(position);
		}
		return positionList;
		
	}
	
	public Position addPositionIndex(Position position){
		Position positionData = positionIndexRepository.save(position);
		return positionData;
	}
	
	
	public void updatePositionIndex(Position position) throws Exception {
			if(positionIndexRepository.exists(position.getJobcode())){
			positionIndexRepository.delete(position.getJobcode());
			addPositionIndex(position);
			}else{
				addPositionIndex(position);
			}
	}
	
}
