package com.example.Controller;

import java.io.Console;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.DriverModel;
import com.example.service.DriverService;
import com.example.service.DriverServiceImpl;

@RestController
@RequestMapping("/driver")
@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
public class DriverController {
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(14);
	
	@Autowired
	private DriverServiceImpl driverServiceImpl;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody DriverModel driver){
		driver.setPassword(encoder.encode(driver.getPassword()));
		driverServiceImpl.registerDriver(driver);
		return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","success")) ;		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody DriverModel driver){
		DriverModel driverModel=driverServiceImpl.getDriver(driver.getDrivername(),driver.getPassword());
		if(driverServiceImpl.verify(driver)!=null && driverModel!=null) {
		 Map<?, ?> tokenandDriverMap=Map.of("token",driverServiceImpl.verify(driver),"driver",driverModel);
		 return ResponseEntity.status(HttpStatus.ACCEPTED).body(tokenandDriverMap);
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad Credentials");
			
		}
	}
	
	@PatchMapping("/{id}/availability") 
	public ResponseEntity<DriverModel> updateAvailability(@PathVariable long id,@RequestParam boolean available){
		
		return ResponseEntity.ok(driverServiceImpl.updateAvailability(id, available));
		
	}
	
	
	
	@GetMapping("/getAvailableDrivers")
	public ResponseEntity<List<DriverModel>> getAvailabelDrivers(){
		return ResponseEntity.ok(driverServiceImpl.getAvailableDrivers());
	}
	
	
	
	
	

}
 