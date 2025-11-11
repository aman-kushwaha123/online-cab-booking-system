package com.example.Controller;

import java.io.Console;
import java.lang.constant.Constable;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.config.JwtFilter;
import com.example.model.*;
import com.example.model.UserModel.Roles;
import com.example.service.JWTService;
import com.example.service.UserService;
import com.example.service.UserServiceImpl;
import com.mysql.cj.protocol.x.Ok;

import jakarta.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
public class UserController {
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(14);
	
	
	@Autowired
	private  UserServiceImpl userServiceImpl;
	
	@Autowired
	private JWTService jwtService;
	
	@PostMapping("/tokenexpired")
	public boolean istokenExpired(@RequestBody String token) {
		return jwtService.isTokenExpired(token);
		
	}
	
	@GetMapping("/view")
	public ModelAndView openUserPage(){
		System.out.println("OpenUserPage");
		ModelAndView modelAndView=new ModelAndView();
		modelAndView.setViewName("User");
		return modelAndView;
		
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> addUser(@RequestBody UserModel user ) {
	    com.example.model.UserModel usermodel=new com.example.model.UserModel();
	    user.setUsername(user.getUsername()); 
	    user.setEmail(user.getEmail());
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRoles(Collections.singletonList(Roles.USER));
		userServiceImpl.addUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","success"));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserModel user) {
		UserModel userModel=userServiceImpl.findUser(user.getUsername(),user.getPassword());
		
		if(userServiceImpl.verify(user)!=null && userModel!=null) {
			 Map<?, ?> tokenandDriverMap=Map.of("token",userServiceImpl.verify(user),"user",userModel);
			 return ResponseEntity.status(HttpStatus.ACCEPTED).body(tokenandDriverMap);
			}
			else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad Credentials");
				
			}
	}
	
	
	
	
	@DeleteMapping("/removeUser/{id}")
	public void removeUser(@PathVariable int id) {
		userServiceImpl.removeUser(id);
	}

}
  