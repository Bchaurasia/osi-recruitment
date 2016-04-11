package com.nisum.employee.ref.security.authorization;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper;

import com.nisum.employee.ref.service.UserService;

import lombok.Setter;

public class UserDetailsContextMapperImpl implements UserDetailsContextMapper, Serializable{
    private static final long serialVersionUID = 3962976258168853954L;
    
    @Autowired
	private UserService userService;
    
    @Setter
	@Autowired
	private IAuthorization authorization;

    @Override
    public void mapUserToContext(UserDetails arg0, DirContextAdapter arg1) {
    }

	@Override
	public UserDetails mapUserFromContext(DirContextOperations ctx, String username,
			Collection<GrantedAuthority> authority) {
		  List<GrantedAuthority> mappedAuthorities = new ArrayList<GrantedAuthority>();
	        if(!userService.isUserAlradyExist(username)){
	        	userService.createUserInfo(username);
	        }
	        mappedAuthorities = authorization.authorize(username);
	        return new User(username, "", true, true, true, true, mappedAuthorities);
	}
}