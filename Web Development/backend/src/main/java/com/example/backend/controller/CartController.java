package com.example.backend.controller;

import com.example.backend.entity.Cart;
import com.example.backend.entity.Clothing;
import com.example.backend.entity.Users;
import com.example.backend.service.CartService;
import com.example.backend.service.ClothingService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/carts")
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final ClothingService clothingService;

    @Autowired
    public CartController(CartService cartService, UserService userService, ClothingService clothingService) {
        this.cartService = cartService;
        this.userService = userService;
        this.clothingService = clothingService;
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity<Object> addToCart(@RequestBody Map<String, Object> requestBody) {

        /// add a way to select color as well
        try {
            Long userId = ((Number) requestBody.get("userId")).longValue();
            Long clothingId = ((Number) requestBody.get("clothingId")).longValue();
            int quantity = (int) requestBody.get("quantity");
            String size = (String) requestBody.get("size");
            String color = (String) requestBody.get("color");

            Optional<Users> userOptional = userService.getUsersById(userId);
            Optional<Clothing> clothingOptional = clothingService.getClothingById(clothingId);

            if (userOptional.isPresent() && clothingOptional.isPresent()) {
                Users user = userOptional.get();
                Clothing clothing = clothingOptional.get();

                Cart cartItem = cartService.addToCart(user, clothing, quantity, size, color);

                Map<String, Object> responseData = new HashMap<>();
                responseData.put("cartId", cartItem.getCartId());
                responseData.put("userId", user.getId());
                responseData.put("clothingId", clothing.getId());
                responseData.put("name", clothing.getName());
                responseData.put("price", clothing.getPrice());
                responseData.put("size", cartItem.getSize());
                responseData.put("color", cartItem.getColors());
                responseData.put("imagePath", clothing.getImagePath());
                responseData.put("quantity", cartItem.getQuantity());
                responseData.put("total", cartItem.getTotal());

                return new ResponseEntity<>(responseData, HttpStatus.CREATED);
            } else {
                String errorMessage = "User or clothing not found.";
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", errorMessage);
                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Map<String, Object>>> getAllCarts() {
        List<Map<String, Object>> cartsData = cartService.getAllCarts();

        return new ResponseEntity<>(cartsData, HttpStatus.OK);
    }

    @GetMapping("/get-by-user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getCartsByUserId(@PathVariable Long userId) {
        try {
            List<Map<String, Object>> cartsData = cartService.getCartsByUserId(userId);
            return new ResponseEntity<>(cartsData, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/update/{cartId}")
    public ResponseEntity<Object> updateCart(
            @PathVariable Long cartId,
            @RequestBody Map<String, Object> requestBody
    ) {
        try {
            Integer newQuantity = (Integer) requestBody.get("newQuantity");
            String newSize = (String) requestBody.get("newSize");
            String newColor = (String) requestBody.get("newColor");

            Cart updatedCart = cartService.updateCart(cartId, newQuantity, newSize, newColor);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Cart updated successfully");
            response.put("cartId", updatedCart.getCartId());
            response.put("userId", updatedCart.getUser().getId());
            response.put("clothingId", updatedCart.getClothing().getId());
            response.put("name", updatedCart.getClothing().getName());
            response.put("price", updatedCart.getClothing().getPrice());
            response.put("imagePath", updatedCart.getClothing().getImagePath());
            response.put("quantity", updatedCart.getQuantity());
            response.put("total", updatedCart.getTotal());
            response.put("size", updatedCart.getSize());
            response.put("color", updatedCart.getColors());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<Object> deleteCart(@PathVariable Long cartId) {
        try {
            cartService.deleteCart(cartId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Cart deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteByUserId/{userId}")
    public ResponseEntity<Object> deleteCartItemsByUserId(@PathVariable Long userId) {
        try {
            cartService.deleteCartItemsByUserId(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Cart items for user with ID " + userId + " deleted successfully.");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
}
