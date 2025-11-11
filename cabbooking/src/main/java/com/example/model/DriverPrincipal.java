package com.example.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class DriverPrincipal implements UserDetails{
	
	private DriverModel driver;
	 
	
	public DriverPrincipal(DriverModel driver) {
		// TODO Auto-generated constructor stub
		this.driver=driver;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities(){
		return Collections.singleton(new SimpleGrantedAuthority("ROLE_DRIVER"));
		
	}
	
	@Override
	public String getUsername() {
		return driver.getDrivername();
	}
	
	@Override
	public String getPassword() {
		return driver.getPassword();
		
	}
	

}
