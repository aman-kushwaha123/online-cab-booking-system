package com.example.backend;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


import com.example.service.UserService;
import com.example.service.UserServiceImpl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@ComponentScan(basePackages = "com.example") 
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.Repository")
@EntityScan(basePackages = "com.example.model")
public class CabbookingApplication {

	public static void main(String[] args) {
	   SpringApplication.run(CabbookingApplication.class, args);
		
		
		
		
	}

}
