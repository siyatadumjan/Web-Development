package com.example.backend.repository;

import com.example.backend.entity.Cart;
import com.example.backend.entity.Clothing;
import com.example.backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserAndClothing(Users user, Clothing clothing);

    List<Cart> findByUser(Users user);

    List<Cart> findByUserId(Long userId);

    void deleteByClothing(Clothing clothing);
}
