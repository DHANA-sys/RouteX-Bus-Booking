package com.bus.routex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan("com.bus.routex.entity")
@SpringBootApplication
public class RoutexApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoutexApplication.class, args);
	}

}
