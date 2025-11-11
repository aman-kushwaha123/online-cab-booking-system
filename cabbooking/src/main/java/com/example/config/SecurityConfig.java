package com.example.config;

import java.beans.BeanProperty;
import java.net.Authenticator.RequestorType;
import java.security.PublicKey;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import com.example.service.CombinedUserDetailService;
import com.mysql.cj.Session;



//specifies that this class is configuration class 
@Configuration
//this notation says that don't go with default flow  go with the my flow
@EnableWebSecurity
public class SecurityConfig  {
	
	@Autowired
	private CombinedUserDetailService combinedUserDetailService;
	
	
	
	@Autowired
	private JwtFilter jwtFilter;
	
	//By default spring security works with securityfilterchain now we make in our way
	//HttpSecurity class is used to returns the object Securityfilterchain for the following function by calling http,build()
	//if we don't provide any filter then there will be no any filter present
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		                    
		                                //All are lambda functions
		//disabling he csrf function
	//http.csrf(Customizer ->Customizer.disable());
		//enabling to authenticate every request 
		
		http.authorizeHttpRequests(request ->request
				.requestMatchers("/user/register","/user/login","/driver/register","/driver/login","/ws/**").permitAll()
				.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
				.requestMatchers("/user/removeUser/**","/admin/**").hasRole("ADMIN")
				.requestMatchers("/driver/**","/booking/accept/**","/booking/pending").hasRole("DRIVER")
				.requestMatchers("/booking/book").hasAnyRole("USER","ADMIN")
				.requestMatchers("/user/**","/booking/allbookings/**").hasAnyRole("USER","ADMIN","DRIVER")
				.requestMatchers("/booking/**").hasRole("USER")
				.requestMatchers("/error").permitAll()
				.anyRequest()
				.authenticated());
		
		http.authenticationProvider(AuthenticationProvider());
	
		//enabling form login
	//http.formLogin(Customizer.withDefaults());
		//enabling for post man for rest access otherwise it returns form login html code
		
		http.httpBasic(Customizer.withDefaults())
		    .exceptionHandling(exception ->exception.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
		
		//making api as stateless means every request will be a new request for server
		//works only on post man for browser we need to disable the formlogin 
		
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);		
		//imperative way of csrf
		Customizer<CsrfConfigurer<HttpSecurity>> custCsrf=new Customizer<CsrfConfigurer<HttpSecurity>>() {
			@Override
			public void customize(CsrfConfigurer<HttpSecurity> customizer) {
				customizer.disable();
				
			}
		};
		
		http.csrf(custCsrf);
		
		return http.build();
	}
	
	
    
	@Bean
	public AuthenticationFailureHandler authenticationFailureHandler() {
	    return (request, response, exception) -> {
	        response.setStatus(HttpStatus.UNAUTHORIZED.value());
	    };
	}
	
	
	//for our AuthenticationProvider(interface) filter
	@Bean
	public AuthenticationProvider AuthenticationProvider() {
		//imlements authenticationprovider
		DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
		provider.setUserDetailsService(combinedUserDetailService);
		provider.setPasswordEncoder(new BCryptPasswordEncoder());
		return provider;
	} 
	
	
	
	
	
	
	//AuthenticationManager talks to AuthenticationProvider
	//
	/*@Bean
	 * you're not manually configuring the AuthenticationManagerBuilder
	 * here — you're letting Spring Boot's auto-configuration do that for you.
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
		
	}*/
	
	
	
	/*Retrieves the AuthenticationManagerBuilder from the HttpSecurity object.

     This builder is used to configure how authentication should be handled.*/
	
	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http)throws Exception{
		AuthenticationManagerBuilder builder=http.getSharedObject(AuthenticationManagerBuilder.class);
		builder.authenticationProvider(AuthenticationProvider());
		
		return builder.build();
	}
	
	
	//cors configuration
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config=new CorsConfiguration();
		config.setAllowedOrigins(List.of("http://localhost:4200"));
	    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("*")); // Or specify headers if needed
		config.setAllowCredentials(true); // ✅ Allow cookies / auth headers
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return  source;
		       
		
		
	}

}
