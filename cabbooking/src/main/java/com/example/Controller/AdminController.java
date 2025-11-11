package com.example.Controller;

import java.io.Console;
import java.security.Identity;
import java.sql.ResultSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Repository.BookingRepository;
import com.example.Repository.DriverRepository;
import com.example.model.BookingModel;
import com.example.model.DriverModel;
import com.example.model.UserModel;
import com.example.model.DriverModel.DriverStatus;
import com.example.service.BookingServiceImp;
import com.example.service.DriverServiceImpl;
import com.example.service.UserServiceImpl;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
public class AdminController {
	@Autowired 
	DriverRepository driverrepo;
	
	@Autowired
	BookingRepository bookingrepo;
	@Autowired 
	DriverServiceImpl driverServiceImpl;
	
	@Autowired 
	UserServiceImpl userServiceImpl;
	
	@Autowired
	BookingServiceImp bookingServiceImp;
	
	//Get pending drivers
	@GetMapping("/drivers/pending")
	public ResponseEntity<List<DriverModel>> getPendingDrivers(){
		List<DriverModel> drivers=driverrepo.findAll()
				.stream().filter(d->d.getStatus() == DriverStatus.PENDING_VERIFICATION)
				.toList();// stream of filter,map
		
		
		return ResponseEntity.ok(drivers);
		
	}
	
	@GetMapping("/drivers/available")
	public ResponseEntity<List<DriverModel>> getAvailableDrivers(){
		List<DriverModel> drivers=driverrepo.findAll()
				.stream().filter(d->d.isAvailable()==true)
				.toList();// stream of filter,map
		System.out.println(drivers);
		
		
		return ResponseEntity.ok(drivers);
		
	}

	//Aprrove Drivers
	@GetMapping("/drivers/{id}/approve")
	public ResponseEntity<DriverModel> getApproveDriver(@PathVariable Long id){
		DriverModel driver=driverrepo.findById(id).orElseThrow();
		driver.setStatus(DriverStatus.APPROVED);
		DriverModel result=driverrepo.save(driver);
		return ResponseEntity.ok(result);
	}
	
	
	@DeleteMapping("/drivers/{id}/reject")
	public void getRejectDriver(@PathVariable Long id){
		driverrepo.deleteById(id);
		return ;
	}
	
	@DeleteMapping("/booking/remove/{id}")
	public void removebooking(@PathVariable Long id){
		bookingServiceImp.removebooking(id);
		return ;
	}
		
	@GetMapping("/getDrivers")
	public ResponseEntity<?> getDrivers(){
		List<DriverModel> drivers=driverServiceImpl.getDrivers();
		return ResponseEntity.ok(drivers);
		
	}
	
	@GetMapping("/allUsers")
	public List<UserModel> userList(){
				return userServiceImpl.findAllUser();
	
	}
	
	@GetMapping("/allBookings")
	public ResponseEntity<List<BookingModel>> allBookings(){
		List<BookingModel> bookings=bookingServiceImp.allBookings();
		return ResponseEntity.ok(bookings);
	}
	
	
	

}
