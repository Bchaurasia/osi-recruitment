package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.repository.ElasticsearchRepository;

@Service
public class ElasticsearchSearvice {
	
	@Autowired
	private ElasticsearchRepository elasticsearchRepository;
	
	public void preparePosition(Position  position){
		elasticsearchRepository.indexPositionObject(position);
	}
	
	public List<Position> searchPositionByClient(String  client){
		return elasticsearchRepository.searchPosition(client);
	}
	
	public List<Position> retrieveAllPositions(){
		return elasticsearchRepository.retrieveAllPositions();
	}
}
