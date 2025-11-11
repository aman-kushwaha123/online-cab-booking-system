package com.example.service;

import java.lang.annotation.ElementType;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Repository.UserRepository;
import com.example.model.UserModel;
import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.EnumKeySerializer;


@Service
public class UserServiceImpl implements  UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JWTService jwtService;
	
	
	BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
	
	@Override
	public void addUser(UserModel user) {
		
		try {
		 userRepository.save(user);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@Override
	public UserModel findUser(String username,String password) {
		try {
		//optional gives methods for getting entities
		 Optional<UserModel> optional=userRepository.findByUsername(username);
		 UserModel user=optional.get();
		
		 if(username.equals(user.getUsername()) && passwordEncoder.matches(password, user.getPassword())) {
			 return user;
			}
		 else {
			 return null;
		 }
		 }
		 
		catch(Exception e) {
			e.printStackTrace();
		  return null;
			
		}
    
	}
	
	
	@Override
	public List<UserModel> findAllUser() {
		
		try {
			
		List<UserModel> result=userRepository.findAll();
		System.out.println(result.get(1));
		return result;
		}
		catch(Exception e) {
			e.printStackTrace();
			return Collections.emptyList();
		}
		
		
		
	}
	
	
	@Override
	public void removeUser(int id) {
		
		try {
			userRepository.deleteById(id);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	@Override 
	public String verify(UserModel user) throws AuthenticationCredentialsNotFoundException {
		try {
		Authentication authentication=authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
		
		
			if(authentication.isAuthenticated()) {
				
				return jwtService.generateToken(user.getUsername()) ;
		}
		else {
			
			return null;
		}
	}catch (Exception e) {
		// TODO: handle exception
		return "There is erorr occurring while verfiying";
	}
		
	}
	

}
