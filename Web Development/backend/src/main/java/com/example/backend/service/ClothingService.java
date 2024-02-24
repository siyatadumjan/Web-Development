package com.example.backend.service;

import com.example.backend.entity.Clothing;
import com.example.backend.repository.ClothingRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClothingService {
    private final ClothingRepository clothingRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired

    public ClothingService(ClothingRepository clothingRepository)    {
        this.clothingRepository= clothingRepository;
    }
    public Clothing createClothing(Clothing clothing)   {
        if (clothing == null || clothing.getName() == null || clothing.getName().isEmpty()) {
            throw new RuntimeException("Invalid clothing information. Name cannot be empty.");
        }
        Optional<Clothing> existingClothing = clothingRepository.findByName(clothing.getName());
        if(existingClothing.isPresent()){
            throw new RuntimeException("Clothing item with the same name already exists.");
        }
        //note to self: if i need to validate anything else or remember any other validation do add it here
        /**/
        //add validations here
        /**/
        return clothingRepository.save(clothing);
    }
    //get all clothing
    public synchronized List<Clothing> getAllClothing()  {
        return clothingRepository.findAll();
    }
    public Optional<Clothing> getClothingById(long id){
        return clothingRepository.findById(id);
    };
    public synchronized Clothing patchClothing(Long id, String patchData) {
        Clothing existingClothing = clothingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Clothing not found with id: " + id));

        try {
            Clothing patchedClothing = objectMapper.readerForUpdating(existingClothing)
                    .readValue(patchData);

            return clothingRepository.save(patchedClothing);
        } catch (Exception e) {
            throw new RuntimeException("Failed to patch clothing", e);
        }
    }
    @Transactional
    public synchronized Clothing updateClothing(Long id, Clothing updatedClothing) {
        try {
            Optional<Clothing> optionalClothing = clothingRepository.findById(id);
            if (optionalClothing.isPresent()) {
                Clothing existingClothing = optionalClothing.get();
                // Update the fields of existingClothing with the values from updatedClothing
                // You can use setters or other methods as needed
                existingClothing.setName(updatedClothing.getName());
                existingClothing.setCategory(updatedClothing.getCategory());
                existingClothing.setPrice(updatedClothing.getPrice());
                existingClothing.setInStock(updatedClothing.getInStock());
                existingClothing.setImagePath(updatedClothing.getImagePath());
                existingClothing.setType(updatedClothing.getType());
                existingClothing.setDescription(updatedClothing.getDescription());

                return clothingRepository.save(existingClothing);
            } else {
                // Handle case where clothing with given id is not found
                throw new RuntimeException("Clothing not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle other exceptions, log or rethrow as needed
            throw new RuntimeException("Error updating clothing with id: " + id, e);
        }
    }
    public void deleteClothing(Long id) {
        try {
            Optional<Clothing> optionalClothing = clothingRepository.findById(id);
            if (optionalClothing.isPresent()) {
                Clothing clothing = optionalClothing.get();
                clothingRepository.delete(clothing);
            } else {
                // Handle case where clothing with given id is not found
                throw new RuntimeException("Clothing not found with id: " + id);
            }
        } catch (Exception e) {
            // Handle other exceptions, log or rethrow as needed
            throw new RuntimeException("Error deleting clothing with id: " + id, e);
        }
    }

}

