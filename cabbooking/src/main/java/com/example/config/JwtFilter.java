package com.example.config;

import java.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.Repository.DriverRepository;
import com.example.service.JWTService;
import com.example.service.CombinedUserDetailService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//for validating the jwt token
//onceperrequestfilter class makes this class to behave like filter 

@Component
public class JwtFilter extends OncePerRequestFilter{
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	private ApplicationContext context;
	
	@Autowired
	private DriverRepository driverrepo;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException{
		
		String authheader=request.getHeader("Authorization");
		String token=null;
		String username=null;
		
		if(authheader !=null && authheader.startsWith("Bearer ")) {
			token=authheader.substring(7);
			username=jwtService.extractUsername(token);
		}
		
		
		
		
		if(username !=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			
		 UserDetails userDetails=context.getBean(CombinedUserDetailService.class).loadUserByUsername(username);
		
	    	if(jwtService.validateToken(token,userDetails)){
				UsernamePasswordAuthenticationToken authtoken =new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				System.out.println(authtoken.isAuthenticated());
				authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authtoken);
				
			}
			
		}
			
	    filterChain.doFilter(request, response);
			
			
}
	

	
	

}
