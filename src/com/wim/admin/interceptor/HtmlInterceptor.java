package com.wim.admin.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.wim.admin.service.UserService;

public class HtmlInterceptor extends HandlerInterceptorAdapter {

	@Autowired
	private UserService userService;
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // TODO Auto-generated method stub

		String url = request.getRequestURI();
		String[] arr = url.split("/");
		String page = arr[arr.length - 1];
        HttpSession session = request.getSession();
        if(session.getAttribute("user") != null && !session.getAttribute("user").equals("")) {
        	int id = (int) session.getAttribute("user");
        	String power = userService.getById(id).getPower();
        	if(power.equals("root")) {
        		return true;
        	}else if(power.equals("admin")) {
        		if(page.equals("admin-list.html") || page.equals("admin-add.html")) {
        			response.sendRedirect("/wim-Admin/error.html");
                    return false;
        		}else return true;
        	}else if(power.equals("normal")) {
        		if(page.equals("member-list.html")
        				|| page.equals("modAndArcane-list.html") || page.equals("other-list.html")
        				|| page.equals("petSellCheck.html") || page.equals("report.html")
        				|| page.equals("warframe-list.html") || page.equals("warframePart-list.html")
        				|| page.equals("weapon-list.html") || page.equals("weaponPart-list.html")
        				|| page.equals("welcome1.html") || page.equals("admin-list.html")
        				|| page.equals("admin-add.html")) {
        			response.sendRedirect("/wim-Admin/error.html");
                    return false;
        		}else return true;
        	}
        	response.sendRedirect("/wim-Admin");
            return false;
        }
        response.sendRedirect("/wim-Admin");
        return false;
    }
	
}
