package ro.atm.management.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

	@GetMapping("/ceva")
	public String metodaCeva() {
		return "SALUTARE TEST";	
	}
	
}
