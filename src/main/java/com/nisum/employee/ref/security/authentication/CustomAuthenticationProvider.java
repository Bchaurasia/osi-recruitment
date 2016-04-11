package com.nisum.employee.ref.security.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	@Setter
	@Autowired
	ActiveDirectoryLdapAuthenticationProvider adAuthenticationProvider;
	
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    	
    	log.info("in Ldap authenticationProvider");
    	authentication = adAuthenticationProvider.authenticate(authentication);
        return authentication;
    }
  
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}