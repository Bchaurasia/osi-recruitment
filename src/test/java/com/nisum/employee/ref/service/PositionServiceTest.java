package com.nisum.employee.ref.service;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.repository.PositionRepository;
import com.nisum.employee.ref.search.PositionSearchService;

@RunWith(MockitoJUnitRunner.class)
public class PositionServiceTest {

	private MockMvc mockMvc;

	@InjectMocks
	private PositionService positionService;

	@Mock
	private PositionRepository positionRepository;

	@Mock
	private PositionSearchService positionSearchService;

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
	public final void testRetrievePositionByClient() {
		positionService.retrievePositionByClient(any(String.class));
		verify(positionRepository, times(1)).retrievePositionByClient(
				any(String.class));
	}

	@Test
	public final void testRetrieveAllPositions() {
		positionService.retrieveAllPositions();
		verify(positionRepository, times(1)).retrieveAllPositions();
	}

	@Test
	public final void testRetrievePositionsbasedOnDesignation() {
		positionService.retrievePositionsbasedOnDesignation(any(String.class));
		verify(positionRepository, times(1))
				.retrievePositionsbasedOnDesignation(any(String.class));

	}

	@Test
	public final void testRetrievePositionsbasedOnJobCode() {
		positionService.retrievePositionsbasedOnJobCode(any(String.class));
		verify(positionRepository, times(1)).retrievePositionsbasedOnJobCode(
				any(String.class));

	}

	@Test
	public final void testRetrievePositionsbasedOnRequisitionId() {
		positionService
				.retrievePositionsbasedOnRequisitionId(any(String.class));
		verify(positionRepository, times(1))
				.retrievePositionsbasedOnrequisitionId(any(String.class));
	}

	@Test
	public final void testDeletePositionBasedOnJC() {
		positionService.deletePositionBasedOnJC(any(String.class));
		verify(positionRepository, times(1)).deletePositionBasedOnJC(
				any(String.class));
	}

	@Test
	public final void testRetrievePositionbasedOnLocation() {
		positionService.retrievePositionbasedOnLocation(any(String.class));
		verify(positionRepository, times(1)).retrievePositionbasedOnLocation(
				any(String.class));
	}

	@Test
	public final void testRetrieveAllPositionsAggregate() {
		positionService.retrieveAllPositionsAggregate();
		verify(positionRepository, times(1)).retrieveAllPositionsAggregate();
	}

	@Test
	public final void testRetrievePositionsbasedOnPositionType() {
		positionService.retrievePositionsbasedOnPositionType(any(String.class));
		verify(positionRepository, times(1))
				.retrievePositionsbasedOnPositionType(any(String.class));
	}

	

}
