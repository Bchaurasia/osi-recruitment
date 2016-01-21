package com.nisum.employee.ref.security.authorization;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.stereotype.Component;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.exception.AuthorizationException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("RoleAuthorization")
public class RoleAuthorization implements IAuthorization {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public List<GrantedAuthority> authorize(String userId) {
		
		log.debug("-------------------------------------------");
		String[] parts = userId.split("@");
		log.info("-------------------------------------------");
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").regex(parts[0]));
		UserInfo user = mongoOperations.findOne(query, UserInfo.class);
		if (user != null) {
			List<String> userRoles = user.getRoles();
			for (String userRole : userRoles) {
				grantedAuthorities.add(new GrantedAuthorityImpl(userRole.toUpperCase()));
			}
		}else{
			grantedAuthorities.add(new GrantedAuthorityImpl("ROLE_USER"));
		}

		if (grantedAuthorities.isEmpty()) {
			throw new AuthorizationException(
					"User is not authorized to view this page");
		}
		return grantedAuthorities;
	}
}
