package com.example.Repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;
import org.springframework.stereotype.Repository;
import com.example.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Integer>{
	
	Optional<UserModel> findByUsername(String username);
	
}
  