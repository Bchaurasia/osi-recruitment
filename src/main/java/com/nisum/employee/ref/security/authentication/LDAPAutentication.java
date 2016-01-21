package com.nisum.employee.ref.security.authentication;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;

@Component
public class LDAPAutentication implements IAuthentication {

	
	  @Override
	    public void authenticate(String userName, String password) {
	    		        String[] parts = userName.split("@");
	        try {
	        	/*if (!parts[1].equalsIgnoreCase("gmail.com"))
	        	{
	        		throw new BadCredentialsException("Invalid Credentials");
	        	}*/
	        	
	        	if(StringUtils.equals(userName, userName) && StringUtils.equals(password, password))
	        	{
	        		return;
	        	}
	            
	        } catch (Exception e) {	            
	        	throw new BadCredentialsException("Unable to authenticate user", e);
	        }
	    }
	  
	 
}
