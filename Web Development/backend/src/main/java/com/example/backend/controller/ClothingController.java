package com.example.backend.controller;

import com.example.backend.entity.Clothing;
import com.example.backend.service.ClothingService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/clothing")
@CrossOrigin("*")
public class ClothingController {

    private final ClothingService clothingService;
    @Autowired
    public ClothingController(ClothingService clothingService) {
        this.clothingService = clothingService;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createClothing(@RequestBody Clothing clothing) {
        Map<String, Object> response = new HashMap<>();

        try {
            Clothing createdClothing = clothingService.createClothing(clothing);
            String message = "Clothes added to the list";

            response.put("clothing", createdClothing);
            response.put("message", message);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            // Handle exceptions and return an appropriate response
            response.put("message", "Failed to add clothes to the list");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-all")
    public ResponseEntity<Map<String, Object>> getAllClothing() {
        Map<String, Object> response = new HashMap<>();

        try {
            List<Clothing> allClothing = clothingService.getAllClothing();
            response.put("clothing", allClothing);
            response.put("message", "Clothing list retrieved successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle exceptions and return an appropriate response
            response.put("message", "Failed to retrieve clothing list");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<Map<String, Object>> getClothingById(@PathVariable Long id)   {
        Map<String, Object> response = new HashMap<>();
        try{
            String message = "Successfully fetched Clothing";
            Clothing clothing = clothingService.getClothingById(id).orElseThrow(()-> new RuntimeException("Clothing not Found"));
            response.put("clothing", clothing);
            response.put("message", message)  ;
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (RuntimeException e){
            response.put("message", "Failed to retrieve clothing");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    @PatchMapping("update/{id}")
    public ResponseEntity<Object> patchClothing(@PathVariable Long id, @RequestBody String patchData) {
        try {
            Clothing patchedClothing = clothingService.patchClothing(id, patchData);
            return new ResponseEntity<>(patchedClothing, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateClothing(@PathVariable Long id, @RequestBody Clothing updatedClothing) {
        try {
            Clothing updatedEntity = clothingService.updateClothing(id, updatedClothing);
            return new ResponseEntity<>(updatedEntity, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteClothing(@PathVariable Long id) {
        try {
            clothingService.deleteClothing(id);
            return new ResponseEntity<>("Successfully Deleted Clothing", HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}



