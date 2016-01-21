package com.nisum.employee.ref.security;

import java.util.List;

import lombok.Setter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import com.nisum.employee.ref.security.authentication.IAuthentication;
import com.nisum.employee.ref.security.authorization.IAuthorization;


public class SecurityProvider extends AbstractUserDetailsAuthenticationProvider  {
	
	@Setter
	@Autowired
	private IAuthentication authentication;
	
	@Setter
	@Autowired
	private IAuthorization authorization;

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken token)
			throws AuthenticationException {
	}

	@Override
    protected UserDetails retrieveUser(String userName, UsernamePasswordAuthenticationToken authToken)
            throws AuthenticationException {
		authentication.authenticate(userName,authToken.getCredentials().toString());
		List<GrantedAuthority> grantedAuthorities = authorization.authorize(userName);
		return new User(userName, authToken.getCredentials().toString(), true, true, true, true, grantedAuthorities);
    }

}