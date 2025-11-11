package com.example.service;

import java.util.List;

import com.example.model.BookingModel;

public interface BookingService {
	
	public BookingModel addBooking(BookingModel booking);
	
	public List<BookingModel> allBookings();
	
	public void removebooking(Long id);

}
