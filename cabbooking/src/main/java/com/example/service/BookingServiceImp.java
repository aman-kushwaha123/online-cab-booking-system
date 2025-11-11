package com.example.service;

import java.util.List;

import org.hibernate.internal.util.beans.BeanInfoHelper.ReturningBeanInfoDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repository.BookingRepository;
import com.example.model.BookingModel;

@Service
public class BookingServiceImp  implements BookingService{
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Override
	public BookingModel addBooking(BookingModel bookingModel) {
		
		return bookingRepository.save(bookingModel);
		 
	}
	
	
	@Override
	public List<BookingModel> allBookings(){
		return bookingRepository.findAll();
	}
	
	@Override
	public void removebooking(Long id){
		bookingRepository.deleteById(id);
	}
 	

}
