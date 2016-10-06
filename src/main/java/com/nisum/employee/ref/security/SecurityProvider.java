package com.nisum.employee.ref.security;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.UserInfoRepository;
import com.nisum.employee.ref.security.authentication.IAuthentication;
import com.nisum.employee.ref.security.authorization.IAuthorization;
import com.nisum.employee.ref.service.UserService;
import com.nisum.employee.ref.util.EncryptDecrypt;

import lombok.Setter;


public class SecurityProvider extends AbstractUserDetailsAuthenticationProvider  {
	
	private static final String MESSAGE = "user not found Exception ";

	@Setter
	@Autowired
	private IAuthentication authentication;
	
	@Setter
	@Autowired
	private IAuthorization authorization;
	@Autowired
	private UserService userService;
    @Autowired
	private UserInfoRepository userInfoRepository;

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken token)
			throws AuthenticationException {
	}

	@Override
    protected UserDetails retrieveUser(String userName, UsernamePasswordAuthenticationToken authToken)
            throws AuthenticationException {
		List<GrantedAuthority> grantedAuthorities = null;
		
    		List<UserInfo> user = userInfoRepository.retrieveUserById(userName);
    		try {
				String decryptedPwd = EncryptDecrypt.decrypt(user.get(0).getPassword());
				if(authToken.getCredentials().equals(decryptedPwd)){
					grantedAuthorities = authorization.authorize(userName);
					return new User(userName, authToken.getCredentials().toString(), true, true, true, true, grantedAuthorities);
				}
				else{
					throw new UsernameNotFoundException(MESSAGE);
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				throw new UsernameNotFoundException(MESSAGE);
			}
		
    }
	
}