package ro.atm.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"ro.atm.management.model"})
@EnableJpaRepositories(basePackages = {"ro.atm.management.repo"})
@ComponentScan(basePackages = {"ro.atm.management.controllers", "ro.atm.management.security"})
public class ManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManagementApplication.class, args);
	}

}
