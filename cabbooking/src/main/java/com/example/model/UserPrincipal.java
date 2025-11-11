package com.example.model;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

//says the current user
public class UserPrincipal implements UserDetails{
	
	private UserModel user;
	
	public UserPrincipal(UserModel user) {
		this.user=user;
		
	}
	
	 @Override
	 public Collection<? extends GrantedAuthority> getAuthorities() {
		    System.out.println(user.getRoles());
	        return user.getRoles().stream()
	            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
	            .collect(Collectors.toList());
	    }

	//roles
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUsername();
	}
	
	
	
	
	
	
	

}
