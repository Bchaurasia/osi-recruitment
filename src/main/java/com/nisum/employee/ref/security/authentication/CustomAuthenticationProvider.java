package com.nisum.employee.ref.security.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	private static final String DOMAIN_NAME = "@osius.com";
	@Setter
	@Autowired
	ActiveDirectoryLdapAuthenticationProvider adAuthenticationProvider;
	
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException{
    	try{
    	log.info("in Ldap authenticationProvider");
    	String[] parts=authentication.getName().split("@");
    	
    	if(authentication.getName().equalsIgnoreCase(parts[0]+DOMAIN_NAME)){
    	authentication = adAuthenticationProvider.authenticate(authentication);
    	return authentication;
    	}else{
    		throw new UsernameNotFoundException("User not found");
    	}
    	}catch(org.springframework.ldap.CommunicationException e){
    		System.out.println("Error in Authenticating user, communication time out error");
    		log.info("error in communicating to ldap server");
    		throw new UsernameNotFoundException("ldap communication exception. request time out.");
    	}
    }
  
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}