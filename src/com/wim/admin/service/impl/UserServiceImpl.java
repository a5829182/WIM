package com.wim.admin.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wim.admin.mapper.UserMapper;
import com.wim.admin.pojo.User;
import com.wim.admin.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public int add(User user) {
		return userMapper.add(user);
	}

	@Override
	public int delete(int id) {
		return userMapper.delete(id);
	}

	@Override
	public User getById(int id) {
		return userMapper.getById(id);
	}

	@Override
	public User getByName(String username) {
		return userMapper.getByName(username);
	}

	@Override
	public int update(User user) {
		return userMapper.update(user);
	}

	@Override
	public List<User> list() {
		return userMapper.list();
	}

}
