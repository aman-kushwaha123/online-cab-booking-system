package com.example.Controller;



import java.io.Console;
import java.security.Identity;
import java.util.List;

import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;

import com.example.Repository.BookingRepository;
import com.example.Repository.DriverRepository;
import com.example.model.BookingModel;
import com.example.model.BookingModel.Status;
import com.example.model.DriverModel;
import com.example.service.BookingServiceImp;
import com.example.service.DriverServiceImpl;

import org.springframework.messaging.simp.SimpMessagingTemplate;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
public class BookingController {
	
	@Autowired
	private BookingServiceImp bookingServiceImp;
	
	@Autowired
	private DriverRepository driverRepository;
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@PostMapping("/book")
	public BookingModel Booking(@RequestBody BookingModel booking) {
		 booking.setStatus(Status.PENDING);
		 System.out.println(booking.getStatus());
		 BookingModel result=bookingServiceImp.addBooking(booking);
		 //notify All Drivers
		 System.out.println(result);
		 messagingTemplate.convertAndSend("/topic/drivers",result);
		 
		 return result;
		
	}
	
	
	@PostMapping("/accept/{bookingId}")
	public ResponseEntity<BookingModel> acceptBooking(@PathVariable Long bookingId,@RequestBody DriverModel driver) {
		BookingModel booking=bookingRepository.findById(bookingId).orElseThrow();
		
		if(!booking.getStatus().equals(Status.PENDING)) throw new RuntimeException("Already Accepted");
			booking.setStatus(Status.ACCEPTED);
			booking.setDriver(driver);
			DriverModel driverModel=driverRepository.findById(driver.getId()).orElseThrow();
			booking.setDriver(driverModel);
			return ResponseEntity.ok(bookingRepository.save(booking));
			
		
		
	}
	
	
	@GetMapping("/allbookings/{id}")
	public ResponseEntity<List<BookingModel>> allBookings(@PathVariable Long id){
		
		List<BookingModel> bookings=bookingRepository.findAll().stream().filter(d->d.getUser().getId().equals(id)).toList();
		System.out.println(bookings);
		return ResponseEntity.ok(bookings);
	}
	
	
	

	
	@GetMapping("/pending")
	public ResponseEntity<List<BookingModel>> pendingBookingModel() {
		List<BookingModel> result=bookingRepository.findAll().stream().filter(d->d.getStatus()==Status.PENDING).toList();
		return ResponseEntity.ok(result);
		
	}
	
	
	
	
	
	
	

}
