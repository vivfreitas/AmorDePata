package com.programming.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SpringApplicationUser {
    public static void main(String[] args) {
        SpringApplication.run(SpringApplicationUser.class, args);
    }
}