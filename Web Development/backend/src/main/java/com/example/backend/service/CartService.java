package com.example.backend.service;

// ... other imports

import com.example.backend.entity.Cart;
import com.example.backend.entity.Clothing;
import com.example.backend.entity.Users;
import com.example.backend.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public synchronized Cart addToCart(Users user, Clothing clothing, int quantity, String size, String color) {
        if (user == null || clothing == null || quantity <= 0) {
            throw new IllegalArgumentException("Invalid input parameters");
        }

        // Check if the same clothing is already in the cart for the user
        Cart existingCart = cartRepository.findByUserAndClothing(user, clothing);

        if (existingCart != null && size.equals(existingCart.getSize()) && color.equals(existingCart.getColors())) {
            // If the clothing is already in the cart, update the quantity and total
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            existingCart.setTotal(calculateTotal(clothing.getPrice(), existingCart.getQuantity()));
            return cartRepository.save(existingCart);
        } else {
            // If the clothing is not in the cart, create a new cart item
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setClothing(clothing);
            newCart.setQuantity(quantity);
            newCart.setSize(size);
            newCart.setColors(color);
            newCart.setTotal(calculateTotal(clothing.getPrice(), quantity));
            return cartRepository.save(newCart);
        }
    }

    public synchronized List<Map<String, Object>> getAllCarts() {
        List<Map<String, Object>> cartsData = new ArrayList<>();

        // Fetch all carts from the repository
        List<Cart> carts = cartRepository.findAll();

        // Convert each cart to a simplified map and add it to the list
        for (Cart cart : carts) {
            Map<String, Object> cartData = new HashMap<>();
            cartData.put("cartId", cart.getCartId());
            cartData.put("userId", cart.getUser().getId());
            cartData.put("clothingId", cart.getClothing().getId());
            cartData.put("name", cart.getClothing().getName());
            cartData.put("price", cart.getClothing().getPrice());
            cartData.put("imagePath", cart.getClothing().getImagePath());
            cartData.put("size", cart.getSize());
            cartData.put("color", cart.getColors());
            cartData.put("quantity", cart.getQuantity());
            cartData.put("total", cart.getTotal());

            cartsData.add(cartData);
        }

        return cartsData;
    }

    public synchronized List<Map<String, Object>> getCartsByUserId(Long userId) {
        List<Map<String, Object>> cartsData = new ArrayList<>();

        // Fetch carts by user ID from the repository
        List<Cart> carts = cartRepository.findByUserId(userId);

        // Convert each cart to a simplified map and add it to the list
        for (Cart cart : carts) {
            Map<String, Object> cartData = new HashMap<>();
            cartData.put("cartId", cart.getCartId());
            cartData.put("userId", cart.getUser().getId());
            cartData.put("clothingId", cart.getClothing().getId());
            cartData.put("name", cart.getClothing().getName());
            cartData.put("price", cart.getClothing().getPrice());
            cartData.put("imagePath", cart.getClothing().getImagePath());
            cartData.put("size", cart.getSize());
            cartData.put("color", cart.getColors());
            cartData.put("quantity", cart.getQuantity());
            cartData.put("total", cart.getTotal());

            cartsData.add(cartData);
        }

        return cartsData;
    }

    public synchronized Cart updateCart(Long cartId, Integer newQuantity, String newSize, String newColor) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);

        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();

            if (newQuantity != null && newQuantity > 0) {
                // Update quantity
                cart.setQuantity(newQuantity);
                cart.setTotal(calculateTotal(cart.getClothing().getPrice(), newQuantity));
            }

            if (newSize != null && !newSize.isEmpty()) {
                // Update size
                cart.setSize(newSize);
            }
            if (newColor != null && !newColor.isEmpty())  {
                cart.setColors(newColor);
            }

            return cartRepository.save(cart);
        } else {
            throw new IllegalArgumentException("Cart not found with ID: " + cartId);
        }
    }


    public synchronized void deleteCart(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);

        if (optionalCart.isPresent()) {
            cartRepository.deleteById(cartId);
        } else {
            throw new IllegalArgumentException("Cart not found with ID: " + cartId);
        }
    }

    public synchronized void deleteCartItemsByUserId(Long userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);

        if (!cartItems.isEmpty()) {
            cartRepository.deleteAll(cartItems);
        } else {
            throw new IllegalArgumentException("Cart not found for user with id: " + userId);
        }
    }

    private BigDecimal calculateTotal(BigDecimal price, int quantity) {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
