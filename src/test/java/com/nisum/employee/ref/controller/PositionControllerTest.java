package com.nisum.employee.ref.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import com.nisum.employee.ref.service.PositionService;
import com.nisum.employee.ref.util.ExceptionHandlerAdviceUtil;
import com.nisum.employee.ref.util.MockTestUtil;

@RunWith(MockitoJUnitRunner.class)
public class PositionControllerTest {

	private MockMvc mockMvc;

	@Mock
	private PositionService positionService;

	@InjectMocks
	private PositionController controller = new PositionController();

	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(controller)
				.setHandlerExceptionResolvers(ExceptionHandlerAdviceUtil.createExceptionResolver()).build();
	}

	@Test
	public void shouldCreatePosition() throws Exception {
		doNothing().when(positionService).preparePosition(any(Position.class));

		mockMvc.perform(
				post("/position").contentType(MediaType.APPLICATION_JSON).
				content(MockTestUtil.convertToJsonFormat(new Position()))).andExpect(status().isOk());

	}
}
