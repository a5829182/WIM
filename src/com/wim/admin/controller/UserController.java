package com.wim.admin.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.wim.admin.pojo.User;
import com.wim.admin.service.UserService;

@Controller
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public String login(@RequestBody User user, HttpSession session) {
		List<User> list = userService.list();
		User u;
		for(int i = 0; i < list.size(); i++) {
			u = list.get(i);
			if(u.getUsername().equals(user.getUsername())) {
				if(u.getPassword().equals(user.getPassword())) {
					session.setAttribute("user", u.getId());
					return "success";
				}else return "password error";
			}else if(i >= list.size() - 1) {
				return "not found";
			}
		}
		return "fail";
	}
	
	@RequestMapping(value = "/adminList", method = RequestMethod.GET)
	@ResponseBody
	public String adminList(HttpSession session) {
		if(session.getAttribute("user") != null) {
			int id = (int) session.getAttribute("user");
			String power = userService.getById(id).getPower();
			if(power.equals("root")) {
				return JSON.toJSONString(userService.list());
			}
			return "";
		}
		return "";
	}
	
	@RequestMapping(value = "/adminSearch", method = RequestMethod.GET)
	@ResponseBody
	public String adminSearch(@RequestParam(value="username") String username, HttpSession session) {
		if(session.getAttribute("user") != null) {
			int id = (int) session.getAttribute("user");
			String power = userService.getById(id).getPower();
			if(power.equals("root")) {
				return JSON.toJSONString(userService.getByName(username));
			}
			return "";
		}
		return "";
	}
	
	@RequestMapping(value = "/adminAdd", method = RequestMethod.POST)
	@ResponseBody
	public String adminAdd(@RequestBody User user, HttpSession session) {
		if(session.getAttribute("user") != null) {
			int id = (int) session.getAttribute("user");
			String power = userService.getById(id).getPower();
			if(power.equals("root")) {
				if(userService.add(user) > 0) {
					return "success";
				}
			} 
			return "";
		}
		return "";
	}
	
	@RequestMapping(value = "/adminUpdate", method = RequestMethod.POST)
	@ResponseBody
	public String adminUpdate(@RequestBody User user, HttpSession session) {
		if(session.getAttribute("user") != null) {
			int id = (int) session.getAttribute("user");
			String power = userService.getById(id).getPower();
			if(power.equals("root")) {
				if(userService.update(user) > 0) {
					return "success";
				}
			} 
			return "";
		}
		return "";
	}
	
	@RequestMapping(value = "/adminDelete", method = RequestMethod.POST)
	@ResponseBody
	public String adminDelete(@RequestBody User user, HttpSession session) {
		if(session.getAttribute("user") != null) {
			int id = (int) session.getAttribute("user");
			String power = userService.getById(id).getPower();
			if(power.equals("root")) {
				if(userService.delete(user.getId()) > 0) {
					return "success";
				}
			}
			return "";
		}
		return "";
	}
	
	@RequestMapping("/")
	public ModelAndView loginIndex() {
		ModelAndView mav = new ModelAndView("login");
		return mav;
	}
	
}
