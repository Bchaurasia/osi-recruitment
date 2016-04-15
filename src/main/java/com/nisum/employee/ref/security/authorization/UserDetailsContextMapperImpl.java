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

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.UserInfoRepository;
import com.nisum.employee.ref.service.UserService;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
@Slf4j
public class UserDetailsContextMapperImpl implements UserDetailsContextMapper, Serializable{
    private static final long serialVersionUID = 3962976258168853954L;
    
    @Autowired
	private UserService userService;
    @Autowired
	private UserInfoRepository infoRepository;
    
    @Setter
	@Autowired
	private IAuthorization authorization;

    @Override
    public void mapUserToContext(UserDetails arg0, DirContextAdapter arg1) {
    }

	@Override
	public UserDetails mapUserFromContext(DirContextOperations ctx, String username,
			Collection<? extends GrantedAuthority> authorities) {
		 log.info("inside ldap user autherization");
		 List<GrantedAuthority> mappedAuthorities = new ArrayList<GrantedAuthority>();
	        if(!userService.isUserAlradyExist(username)){
	        	infoRepository.registerUserByEmailId(enrichUserInfo(username));
	        }
	        mappedAuthorities = authorization.authorize(username);
	        log.debug("User {} with role : {}", username,mappedAuthorities);
	        return new User(username, "", true, true, true, true, mappedAuthorities);
	}

	private UserInfo enrichUserInfo(String username) {
		UserInfo info =new UserInfo();
		info.setEmailId(username);
		return info;
	}
}