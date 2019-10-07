package com.project.dhpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages={"com.project"})
@EntityScan(basePackages = {"com.project.dhpro.models"})
@EnableJpaRepositories("com.project.dhpro.repository")
public class DhproApplication {

    public static void main(String[] args) {
        SpringApplication.run(DhproApplication.class, args);
    }

}
