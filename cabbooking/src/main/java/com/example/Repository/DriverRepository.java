package com.example.Repository;

import java.security.Identity;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.model.DriverModel;
@Repository
public interface DriverRepository extends JpaRepository<DriverModel,Long> {
	
	  DriverModel findByEmail(String email);
	  
	  Optional<DriverModel> findByDrivername(String drivername);
	  
	  boolean existsByDrivername(String drivername);
	

}
