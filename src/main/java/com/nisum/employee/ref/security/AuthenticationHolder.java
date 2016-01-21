package com.nisum.employee.ref.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationHolder {
	
	/**
	 * To retrieve username from the current security context if the user has logged into RI application.
	 * 
	 * @return
	 */
	public String getUsername() {
		return ((User)(SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getUsername();
	}

	/**
	 * To retrieve password from the current security context if the user has logged into RI application.
	 * 
	 * @return
	 */
	public String getPassword() {
		return SecurityContextHolder.getContext().getAuthentication().getCredentials().toString();
	}

}
