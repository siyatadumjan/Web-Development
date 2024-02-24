package com.example.backend;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EntityScan("com.example.backend")
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder){
        return args -> {
            if (userRepository.findByUsername("admin").isPresent()) {
                Users adminUser = userRepository.findByUsername("admin").get();

                // Assuming getRole() returns the user's role
                if ("admin".equals(adminUser.getRoles())) {
                    // The user is an admin
                    return;
                }
            }

            try {
                Users admin = new Users();
                admin.setName("admin_user");
                admin.setEmail("admin@admin.com");
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("securepassword"));
                admin.setRoles("admin");
                admin.setVerified(true);

                userRepository.save(admin);
            } catch (Exception e) {
                // Handle or log the exception (e.g., logger.error("Error creating admin user", e);)
                e.printStackTrace();
            }
        };
    }
}
