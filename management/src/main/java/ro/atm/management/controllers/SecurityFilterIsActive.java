package ro.atm.management.controllers;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import ro.atm.management.model.User;
import ro.atm.management.repo.RepoUser;
import ro.atm.management.service.UserService;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@WebFilter("/rest/*")
public class SecurityFilterIsActive implements Filter {

	
	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private UserService userService;
	
	public SecurityFilterIsActive() {
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		 Principal principal = request.getUserPrincipal();

		System.out.println("PRINCIPAL: " + principal);

		// application/x-www-form-urlencoded;charset=UTF-8
		if ("OPTIONS".equalsIgnoreCase(((HttpServletRequest) req).getMethod())) {
			System.out.println("OPTIONS PREFLIGHT CHECK");
			response.setStatus(HttpServletResponse.SC_OK);
		} else {
			System.out.println("DOING IS ACTIVE FILTER");
//			if (principal != null) {
//				
//				// do whatever you need here with the UserDetails
//				User userLoggedIn = this.repoUser.findByEmail(principal.getName()).get();
//				if(userLoggedIn.getIsActive() == null || userLoggedIn.getIsActive().equals(0)) {
//					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//				}else {
//					chain.doFilter(req, res);
//				}
//			}
			chain.doFilter(req, res);
		}
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
	}
}
