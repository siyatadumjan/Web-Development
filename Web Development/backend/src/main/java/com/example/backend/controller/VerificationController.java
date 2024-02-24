package com.example.backend.controller;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping
@CrossOrigin("*")
public class VerificationController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/verification")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) {
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            if (!user.isVerified()) { // Check if not already verified
                user.setVerified(true);
                userRepository.save(user);

                Map<String, Object> response = new HashMap<>();
                response.put("message", "Email verification successful");
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", "Email is already verified");
                return ResponseEntity.badRequest().body(errorResponse);
            }
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found for email: " + email);
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
