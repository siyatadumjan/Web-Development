package com.example.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "clothing")
public class Clothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false)
    private String type;

    @ElementCollection
    @CollectionTable(name = "clothing_size", joinColumns = @JoinColumn(name = "clothing_id"))
    @Column(name = "size")
    private List<String> size;

    @ElementCollection
    @CollectionTable(name = "clothing_color", joinColumns = @JoinColumn(name = "clothing_id"))
    @Column(name = "color")
    private List<String> color;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Boolean inStock = true;
    @Column(nullable = false)
    private Boolean bestseller = false;
    @Column(nullable = false)
    private Boolean New = false;

    @Column(nullable = true, length = 5000)
    private String imagePath;

    // Constructors, getters, and setters
    @Column(name = "description",columnDefinition = "TEXT", length=10000)
    private String description;
    // Enum representing the category

    // need to add a description here
    public enum Category {
        Male, Female, Unisex, Other
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getSize() {
        return size;
    }

    public void setSize(List<String> size) {
        this.size = size;
    }

    public List<String> getColor() {
        return color;
    }

    public void setColor(List<String> color) {
        this.color = color;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }

    public Boolean getBestseller() {
        return bestseller;
    }

    public void setBestseller(Boolean bestseller) {
        this.bestseller = bestseller;
    }

    public Boolean getNew() {
        return New;
    }

    public void setNew(Boolean aNew) {
        New = aNew;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
