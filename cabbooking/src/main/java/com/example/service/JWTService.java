package com.example.service;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap.KeySetView;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import com.example.model.UserModel;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
	
	
	
	private String secretkey="";
	
	public JWTService() throws NoSuchAlgorithmException{
		KeyGenerator keygen=KeyGenerator.getInstance("HmacSHA256");
		SecretKey sKey=keygen.generateKey();
		secretkey=Base64.getEncoder().encodeToString(sKey.getEncoded());
		
	}
	
	public String generateToken(String username) {
		//key and value type 
		Map<String,Object> claims=new HashMap<String, Object>();
		
		Date expirationDate=Date.from(Instant.now().plus(Duration.ofHours(1)));
		
		return Jwts.builder()
				.claims()
				.add(claims)
				.subject(username)
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(expirationDate)       //.expiration(new Date(System.currentTimeMillis()+(60*60*60)))
				.and()
				.signWith(getkey())
				.compact();//this will generate token for us
				
	}
	
	private Claims extractClaims(String token) {
		return Jwts
				.parser()
				.verifyWith(getkey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	private SecretKey getkey() {
		// TODO Auto-generated method stub
		byte[] keyBytes=Decoders.BASE64.decode(secretkey);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String extractUsername(String token) {
		// TODO Auto-generated method stub
		return extractClaims(token).getSubject();
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		// TODO Auto-generated method stub
		final String UserName =extractUsername(token);
		return (UserName.equals(userDetails.getUsername()) && !isTokenExpired(token));
		
	}

	public boolean isTokenExpired(String token) {
		// TODO Auto-generated method stub
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		// TODO Auto-generated method stub
		return extractClaim(token,Claims::getExpiration);
	}

	private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		// TODO Auto-generated method stub
		final Claims claims=extractClaims(token);
		return claimResolver.apply(claims);
	}

}
 