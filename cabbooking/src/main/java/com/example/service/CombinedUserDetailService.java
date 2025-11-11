package com.example.service;

import java.security.PublicKey;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.interceptor.CacheOperationInvoker.ThrowableWrapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.Repository.DriverRepository;
import com.example.Repository.UserRepository;
import com.example.model.DriverModel;
import com.example.model.DriverPrincipal;
import com.example.model.UserModel;
import com.example.model.UserPrincipal;

@Service
public class CombinedUserDetailService implements UserDetailsService{
	
	@Autowired
	private UserRepository userepo;
	
	@Autowired
	private DriverRepository driverepo;
	
	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		System.out.println(name);
		Optional<UserModel> user=userepo.findByUsername(name);
		
		if(user.isPresent()) {
			return new UserPrincipal(user.get());
		}
		
		Optional<DriverModel> driver=driverepo.findByDrivername(name);
		
		if(driver.isPresent()) {
			return new DriverPrincipal(driver.get());
		}
		
		throw new UsernameNotFoundException("User or Driver is not found");
		
	}

}
