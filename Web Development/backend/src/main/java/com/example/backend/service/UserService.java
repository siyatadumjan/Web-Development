package com.example.backend.service;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public synchronized Users loadUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }

    public synchronized Optional<Users> getUsersById(long id) {
        return userRepository.findById(id);
    }

    public synchronized List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public synchronized Users putUser(Long userId, Users updatedUser) {
        Users existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Check if 'username' or 'email' is provided in the updatedUser, and throw an exception if they are
        if (updatedUser.getUsername() != null || updatedUser.getEmail() != null) {
            throw new IllegalArgumentException("Username or email cannot be updated");
        }

        // Update user details
        existingUser.setName(updatedUser.getName());
        existingUser.setRoles(updatedUser.getRoles());
        existingUser.setImage(updatedUser.getImage());

        // Check if password is provided, and encode it
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(updatedUser.getPassword());
            existingUser.setPassword(encodedPassword);
        }

        return userRepository.save(existingUser);
    }


    public synchronized Users patchUser(Long userId, Map<String, Object> updates) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String field = entry.getKey();
            Object value = entry.getValue();

            // Exclude email and password from being updated
            if ("email".equals(field) || "password".equals(field)) {
                throw new IllegalArgumentException(field + " cannot be updated");
            }

            // Use the correct field names from your Users entity
            switch (field) {
                case "name":
                    user.setName((String) value);
                    break;

                case "username":
                    user.setUsername((String) value);
                    break;

                case "roles":
                    user.setRoles((String) value);
                    break;

                case "image":
                    user.setImage((String) value);
                    break;

                // Add other fields as needed
                default:
                    throw new IllegalArgumentException("Invalid field for update: " + field);
            }
        }

        // Check if password is provided, and encode it
        if (updates.containsKey("password")) {
            String newPassword = (String) updates.get("password");
            if (newPassword != null && !newPassword.isEmpty()) {
                String encodedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encodedPassword);
            }
        }

        return userRepository.save(user);
    }
    public void deleteUser(Long userId) {
        Users existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userRepository.delete(existingUser);
    }

}
