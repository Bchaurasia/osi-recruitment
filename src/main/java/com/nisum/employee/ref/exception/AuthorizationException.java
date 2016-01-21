package com.nisum.employee.ref.exception;

import org.springframework.security.core.AuthenticationException;


public class AuthorizationException extends AuthenticationException {

	private static final long serialVersionUID = -5805337255507972223L;

	public AuthorizationException(String msg) {
		super(msg);
	}
	
	public AuthorizationException(String message, Throwable th) {
		super(message, th);
	}

}