package com.nisum.employee.ref.service;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.repository.PositionRepository;
import com.nisum.employee.ref.repository.SequenceRepository;
import com.nisum.employee.ref.search.PositionSearchService;

@RunWith(MockitoJUnitRunner.class)
public class PositionServiceTest {

	@InjectMocks
	private PositionService positionService;

	@Mock
	private PositionRepository positionRepository;

	@Mock
	private PositionSearchService positionSearchService;
	
	@Mock
	private SequenceRepository sequenceRepository;

	@Before
	public void init() {
		MockMvcBuilders.standaloneSetup(positionService).build();
	}

	@Test
	public void shouldPreparePosition() throws Exception {
		positionService.preparePosition(any(Position.class));
		verify(positionRepository, times(1)).preparePosition(
				any(Position.class));
	}

	@Test
	public void testRetrievePositionByClient() {
		positionService.retrievePositionByClient(any(String.class));
		verify(positionRepository, times(1)).retrievePositionByClient(
				any(String.class));
	}

	@Test
	public void testRetrieveAllPositions() {
		positionService.retrieveAllPositions();
		verify(positionRepository, times(1)).retrieveAllPositions();
	}

	@Test
	public void testRetrievePositionsbasedOnDesignation() {
		positionService.retrievePositionsbasedOnDesignation(any(String.class));
		verify(positionRepository, times(1))
				.retrievePositionsbasedOnDesignation(any(String.class));

	}

	@Test
	public void testRetrievePositionsbasedOnJobCode() {
		positionService.retrievePositionsbasedOnJobCode(any(String.class));
		verify(positionRepository, times(1)).retrievePositionsbasedOnJobCode(
				any(String.class));

	}

	@Test
	public void testRetrievePositionsbasedOnRequisitionId() {
		positionService
				.retrievePositionsbasedOnRequisitionId(any(String.class));
		verify(positionRepository, times(1))
				.retrievePositionsbasedOnrequisitionId(any(String.class));
	}

	@Test
	public void testDeletePositionBasedOnJC() {
		positionService.deletePositionBasedOnJC(any(String.class));
		verify(positionRepository, times(1)).deletePositionBasedOnJC(
				any(String.class));
	}

	@Test
	public void testRetrievePositionbasedOnLocation() {
		positionService.retrievePositionbasedOnLocation(any(String.class));
		verify(positionRepository, times(1)).retrievePositionbasedOnLocation(
				any(String.class));
	}

	@Test
	public void testRetrieveAllPositionsAggregate() {
		positionService.retrieveAllPositionsAggregate();
		verify(positionRepository, times(1)).retrieveAllPositionsAggregateFromElastic();
	}

	@Test
	public void testRetrievePositionsbasedOnPositionType() {
		positionService.retrievePositionsbasedOnPositionType(any(String.class));
		verify(positionRepository, times(1))
				.retrievePositionsbasedOnPositionType(any(String.class));
	}
 
	@Test
	public void shouldCreateRequitionPosition(){
				
		Requisition requisition = new Requisition();
		
		requisition.setNoOfPositions("1");
		
		positionService.createRequitionPosition(requisition);
		
		verify(positionRepository, times(1)).preparePosition(any(Position.class));
		verify(positionSearchService, times(1)).addPositionIndex(any(Position.class));
	}
	
	@Test
	public void shouldUpdatePosition() throws Exception{
		
		Position position = new Position();
		position.setUpdatedDate(new Date());
		positionService.updatePosition(position);
		
		verify(positionRepository, times(1)).updatePosition(any(Position.class));
		verify(positionSearchService, times(1)).updatePositionIndex(any(Position.class));
		
	}

}
