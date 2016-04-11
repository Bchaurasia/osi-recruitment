package com.nisum.employee.ref.security.authorization;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.ContextSource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;

import com.nisum.employee.ref.security.authorization.IAuthorization;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
@Slf4j
public class CustomAuthorization extends DefaultLdapAuthoritiesPopulator {
	
	@Setter
	@Autowired
	private IAuthorization authorization;

	public CustomAuthorization(ContextSource contextSource,
			String groupSearchBase) {
		super(contextSource, groupSearchBase);
	}

	public Set<GrantedAuthority> getGroupMembershipRoles(String userDn,
			String username) {
		
		System.out.println("inside authorities");
		log.info("in custom authorization service");
		List<GrantedAuthority> grantedAuthorities = authorization.authorize(username);
		
		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>(grantedAuthorities);

		return authorities;
	}

}