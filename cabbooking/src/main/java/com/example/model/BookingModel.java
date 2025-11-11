package com.example.model;

import java.security.KeyStore.PrivateKeyEntry;
import java.sql.Date;
import java.time.LocalDateTime;

import org.springframework.beans.factory.support.ReplaceOverride;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table
@Entity
public class BookingModel {
	
	public enum Status{
		PENDING,
		ACCEPTED
		
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPickupLocation() {
		return pickupLocation;
	}

	public void setPickupLocation(String pickupLocation) {
		this.pickupLocation = pickupLocation;
	}

	public String getDropLocation() {
		return dropLocation;
	}

	public void setDropLocation(String dropLocation) {
		this.dropLocation = dropLocation;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}

	public DriverModel getDriver() {
		return driver;
	}

	public void setDriver(DriverModel driver) {
		this.driver = driver;
	}

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String pickupLocation;
	
	@Column
	private String dropLocation;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@ManyToOne
	private UserModel user;
	
	@ManyToOne
	private DriverModel driver;
	
	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getRide() {
		return ride;
	}

	public void setRide(String ride) {
		this.ride = ride;
	}
	
	@Column
	private String pickup_date_time;
	
	public LocalDateTime getBooking_date_time() {
		return booking_date_time;
	}

	public void setBooking_date_time(LocalDateTime booking_date_time) {
		this.booking_date_time = booking_date_time;
	}

	@Column
	private String dropoff_date_time;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",insertable=false,updatable=false)
	private LocalDateTime booking_date_time;
	

	public String getPickup_date_time() {
		return pickup_date_time;
	}

	public void setPickup_date_time(String pickup_date_time) {
		this.pickup_date_time = pickup_date_time;
	}

	public String getDropoff_date_time() {
		return dropoff_date_time;
	}

	public void setDropoff_date_time(String dropoff_date_time) {
		this.dropoff_date_time = dropoff_date_time;
	}

	@Column
	private String price;
	
	@Column 
	private String ride;
	
	
	
	
	

}
