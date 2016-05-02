package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.elasticsearch.common.collect.Lists;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.search.PositionSearchService;
import com.nisum.employee.ref.service.PositionService;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class PositionControllerTest {

	private MockMvc mockMvc;

	@Mock
	private PositionService positionService;
	
	@Mock
	private PositionSearchService positionSearchService;

	@InjectMocks
	private PositionController controller = new PositionController();

	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
	}

	@Test
	public void shouldCreatePosition() throws Exception {
		doNothing().when(positionService).preparePosition(any(Position.class));

		mockMvc.perform(
				post("/position").contentType(MediaType.APPLICATION_JSON).
				content(MockTestUtil.convertToJsonFormat(new Position()))).andExpect(status().isOk());

	}
	
	@Test
	public void shouldUpdatePosition() throws Exception {
		
		doNothing().when(positionService).updatePosition(any(Position.class));

		mockMvc.perform(
				put("/position").contentType(MediaType.APPLICATION_JSON).
				content(MockTestUtil.convertToJsonFormat(new Position()))).andExpect(status().isAccepted());

	}
	
	@Test
	public void shouldRetrivePositionWithClient() throws Exception {
		List<Position> positions=   Lists.newArrayList(new Position());
		when(positionService.retrievePositionByClient(any(String.class))).thenReturn(positions);

		mockMvc.perform(
				get("/position?client="+any(String.class))).andExpect(status().isOk());

	}
	@Test
	public void shouldRetrivePositionwithDesignations() throws Exception {
		List<Position> positions=   Lists.newArrayList(new Position());
		when(positionService.retrievePositionsbasedOnDesignation(any(String.class))).thenReturn(positions);

		mockMvc.perform(
				get("/position?designation="+any(String.class))).andExpect(status().isOk());

	}
	
	@Test
	public void shouldRetrivePosition() throws Exception {
		List<Position> positions=   Lists.newArrayList(new Position());
		when(positionService.retrieveAllPositions()).thenReturn(positions);

		mockMvc.perform(
				get("/position")).andExpect(status().isOk());

	}
	@Test
	public void shouldsearchPositions() throws Exception {
		List<Position> positions=   Lists.newArrayList(new Position());
		when(positionSearchService.getPostionByDesignationOrClient(any(String.class))).thenReturn(positions);

		mockMvc.perform(
				get("/searchPositionsBySearchQuery")).andExpect(status().isOk());

	}
	
	@Test
	public void shouldsearchPositionsbyQuery() throws Exception {
		List<Position> positions=   Lists.newArrayList(new Position());
		when(positionSearchService.getPostionByDesignationOrClient(any(String.class))).thenReturn(positions);

		mockMvc.perform(
				get("/searchPositionsBySearchQuery?searchQuery="+any(String.class))).andExpect(status().isOk());

	}
	
}
