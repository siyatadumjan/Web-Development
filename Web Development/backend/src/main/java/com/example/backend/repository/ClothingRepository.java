package com.example.backend.repository;

import com.example.backend.entity.Clothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothingRepository extends JpaRepository<Clothing, Long> {

    // Custom query method to find clothing items by category
    List<Clothing> findByCategory(Clothing.Category category);


    Optional<Clothing> findByName(String name);

    Clothing getClothingById(Long id);
}
