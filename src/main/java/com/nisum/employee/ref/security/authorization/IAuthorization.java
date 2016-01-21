package com.nisum.employee.ref.security.authorization;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;

public interface IAuthorization {

	List<GrantedAuthority> authorize(String uid); 

}