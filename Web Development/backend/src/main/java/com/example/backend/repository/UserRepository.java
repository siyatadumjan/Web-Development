package com.example.backend.repository;

import com.example.backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long>  {
    Optional<Users> findByUsername(String username)   ;
    boolean existsByUsernameOrEmail(String username, String email);
    Optional<Users> findByUsernameOrEmail(String username,String email);
    Optional<Users> findByEmail(String email);
}
