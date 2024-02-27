package com.example.backend.Testing;

import com.example.backend.controller.CartController;
import com.example.backend.entity.Cart;
import com.example.backend.entity.Clothing;
import com.example.backend.entity.Users;
import com.example.backend.service.CartService;
import com.example.backend.service.ClothingService;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class CartControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private ClothingService clothingService;

    @Mock
    private CartService cartService;

    @InjectMocks
    private CartController cartController;

    @Test
    void addToCart_Successful() {
        MockitoAnnotations.openMocks(this);

        // Mocking request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("userId", 1L);
        requestBody.put("clothingId", 2L);
        requestBody.put("quantity", 3);
        requestBody.put("size", "M");
        requestBody.put("color", "Blue");

        // Mocking user, clothing, and cart
        Users mockUser = new Users();
        Clothing mockClothing = new Clothing();
        Cart mockCart = new Cart();

        when(userService.getUsersById(1L)).thenReturn(Optional.of(mockUser));
        when(clothingService.getClothingById(2L)).thenReturn(Optional.of(mockClothing));
        when(cartService.addToCart(mockUser, mockClothing, 3, "M", "Blue")).thenReturn(mockCart);

        // Performing the test
        ResponseEntity<Object> responseEntity = cartController.addToCart(requestBody);

        // Assertions
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        Map<String, Object> responseData = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(responseData);
        assertEquals(mockCart.getCartId(), responseData.get("cartId"));
        assertEquals(mockUser.getId(), responseData.get("userId"));
        assertEquals(mockClothing.getId(), responseData.get("clothingId"));
        // Add more assertions based on your response structure
    }

    @Test
    void addToCart_UserOrClothingNotFound() {
        MockitoAnnotations.openMocks(this);

        // Mocking request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("userId", 1L);
        requestBody.put("clothingId", 2L);
        requestBody.put("quantity", 3);
        requestBody.put("size", "M");
        requestBody.put("color", "Blue");

        // Mocking user not found, clothing found
        when(userService.getUsersById(1L)).thenReturn(Optional.empty());
        when(clothingService.getClothingById(2L)).thenReturn(Optional.of(new Clothing()));

        // Performing the test
        ResponseEntity<Object> responseEntity = cartController.addToCart(requestBody);

        // Assertions
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        // Add more assertions based on your error response structure
    }

    // Add more test cases for different scenarios as needed
}
