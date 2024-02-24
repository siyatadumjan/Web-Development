package com.example.backend.controller;

import com.example.backend.entity.Users;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin("*") // change the url value f or it to work on your server
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/all")
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<Users> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUserById(@PathVariable Long userId) {
        try {
            Users user = userService.getUsersById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/edit/{userId}")
    public ResponseEntity<Object> putUser(@PathVariable Long userId, @RequestBody Users updatedUser) {
        try {
            // Check if 'username' or 'email' is provided in the updatedUser, and throw an
            // exception if they are
            if (updatedUser.getUsername() != null || updatedUser.getEmail() != null) {
                throw new IllegalArgumentException("Username or email cannot be updated");
            }

            Users savedUser = userService.putUser(userId, updatedUser);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // If the update fails, return a JSON response with the error message
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
    @PatchMapping("/edit/{userId}")
    public ResponseEntity<Object> patchUser(@PathVariable Long userId, @RequestBody Map<String, Object> updates) {
        try {
            // Check if updates contain 'username' or 'email', and throw an exception if they do
            if (updates.containsKey("username") || updates.containsKey("email")) {
                throw new IllegalArgumentException("Username or email cannot be updated");
            }

            Users updatedUser = userService.patchUser(userId, updates);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // If the patching fails, return a JSON response with the error message
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // If the deletion fails, return a JSON response with the error message
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

}
