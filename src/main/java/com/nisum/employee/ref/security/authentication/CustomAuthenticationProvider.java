package com.nisum.employee.ref.security.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("customAuthenticationProvider")
public class CustomAuthenticationProvider implements AuthenticationProvider {
 
	
	@Autowired
	LdapAuthenticationProvider ldapAuthProvider;
	
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    	System.out.println("inside authentication ");
    	log.info("Ldap authentication provider");
    	authentication = ldapAuthProvider.authenticate(authentication);
        return authentication;
    }
  
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}