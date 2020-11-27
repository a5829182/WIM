package com.wim.admin.mapper;

import java.util.List;

import com.wim.admin.pojo.User;

public interface UserMapper {

	public int add(User user); 
    
    public int delete(int id); 
        
    public User getById(int id); 
    
    public User getByName(String username); 
      
    public int update(User user);  
        
    public List<User> list();
	
}
