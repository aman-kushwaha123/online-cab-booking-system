package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Repository.DriverRepository;
import com.example.model.DriverModel;
import com.example.model.UserModel;
import com.example.model.DriverModel.DriverStatus;


@Service
public class DriverServiceImpl implements DriverService{
	
	@Autowired
	private DriverRepository driverrepo;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JWTService jwtService;
	
	BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
	@Override
	public DriverModel registerDriver(DriverModel driver) {
		driver.setStatus(DriverStatus.PENDING_VERIFICATION);
		driver.setAvailable(false);
		return driverrepo.save(driver);
			
	}
	
	@Override
	public DriverModel updateAvailability(Long id,boolean avialable) {
		DriverModel driver=driverrepo.findById(id).orElseThrow();
		if(driver.getStatus() != DriverStatus.APPROVED) {
			throw new RuntimeException("Driver not approved yet");
		}
		driver.setAvailable(avialable);
		return driverrepo.save(driver);
			
	}
	
	@Override
	public DriverModel getDriver(String drivername,String password) {
		Optional<DriverModel> optional= driverrepo.findByDrivername(drivername);
		DriverModel driver=optional.get();
		if(drivername.equals(driver.getDrivername()) && passwordEncoder.matches(password,driver.getPassword())) {
			return driver;
			
		}
		else {
			return null;
		}
		
		
	}
	
	@Override
	public List<DriverModel> getAvailableDrivers() {
		return driverrepo.findAll().stream().filter(d-> d.isAvailable() && d.getStatus() == DriverStatus.APPROVED).toList();
	}
	
	@Override
	public String verify(DriverModel driver) {
		try {
		Authentication authentication=authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(driver.getDrivername(),driver.getPassword()));
		
		
			if(authentication.isAuthenticated()) {
				
				return jwtService.generateToken(driver.getDrivername()) ;
		}
		else {
			
			return null;
		}
		}
		catch (Exception e) {
			// TODO: handle exception
			return "Token not able to generate";
		}
	}
	
	@Override
	public List<DriverModel> getDrivers(){
		
		return driverrepo.findAll();
		
	}
	
	
	

}
