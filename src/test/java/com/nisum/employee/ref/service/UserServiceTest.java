package com.nisum.employee.ref.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.verify;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.UserInfoRepository;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

	private MockMvc mockMvc;
	
	@InjectMocks
	private UserService userService;
	
	@Mock
	private UserInfoRepository userInfoRepository;
	
	@Before
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(userService).build();
	}
	
	@Test
	public void shouldRegisterUserByEmailId() throws Exception{
		userService.registerUserByEmailId(new UserInfo());
		verify(userInfoRepository,times(1)).registerUserByEmailId(any(UserInfo.class));
	}
	
	@Test
	public void shouldUserAlradyExist() throws Exception{
		userService.isUserAlradyExist(any(String.class));
		verify(userInfoRepository,times(1)).isUserExists(any(String.class));
	}
	
	@Test
	public void shouldRetrieveUser() throws Exception{
		userService.retrieveUser();
		verify(userInfoRepository,times(1)).retrieveUser();
	}
	
	@Test
	public void shouldRetrieveUserById() throws Exception{
		userService.retrieveUserById(any(String.class));
		verify(userInfoRepository,times(1)).retrieveUserById(any(String.class));
	}
	
	@Test
	public void shouldRetrieveUserByName() throws Exception{
		userService.retrieveUserByName(any(String.class));
		verify(userInfoRepository,times(1)).retrieveUserByName(any(String.class));
	}
	
	@Test
	public void shouldRetrieveUserByClient() throws Exception{
		userService.retrieveUserByClient(any(String.class));
		verify(userInfoRepository,times(1)).retrieveUserByClient(any(String.class));
	}
	@Test
	public void shouldRetrieveUserByRole() throws Exception{
		userService.retrieveUserByRole(any(String.class));
		verify(userInfoRepository,times(1)).retrieveUserByRole(any(String.class));
	}
	
	@Test
	public void shouldCreateUserInfo() throws Exception{
		userService.createUserInfo(any(String.class));
		verify(userInfoRepository,times(1)).createUserInfo(any(String.class));
	}
	
	@Test
	public void shouldUpdateUser() throws Exception{
		userService.updateUser(new UserInfo());
		verify(userInfoRepository,times(1)).updateUser(any(UserInfo.class));
	}
}
