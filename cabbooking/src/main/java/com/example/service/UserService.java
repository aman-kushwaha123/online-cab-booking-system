package com.example.service;

import java.lang.module.FindException;
import java.util.List;
import java.util.Map;

import javax.swing.plaf.multi.MultiInternalFrameUI;

import com.example.model.UserModel;

public interface UserService {
	public void addUser(UserModel user);
	
	public UserModel findUser(String username,String password);
	
	public List<UserModel>  findAllUser();
	
	public void removeUser(int id);
	
	public String verify(UserModel user);
	
	
}
 