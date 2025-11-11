package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.model.DriverModel;
import com.example.model.UserModel;

public interface DriverService {
	
	public DriverModel registerDriver(DriverModel driver);
	
	public DriverModel updateAvailability(Long id,boolean available);
	
	public List<DriverModel> getAvailableDrivers();
	
	public String verify(DriverModel driver);
	
	public DriverModel getDriver(String drivername,String password);
	
	public List<DriverModel> getDrivers();

}
