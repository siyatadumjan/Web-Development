package com.example.backend.service;

import com.example.backend.entity.Users;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JWTService {

    @Autowired
    private JwtEncoder jwtEncoder;
    @Autowired
    private JwtDecoder jwtDecoder;

    public String generateJwt(Authentication auth) {

        Instant now = Instant.now();

        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String userClaim;
        long expirationTimeInSeconds = 604800;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            userClaim = objectMapper.writeValueAsString(auth.getPrincipal());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize user details to JSON", e);
        }

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(auth.getName())
                .claim("user", userClaim)
                .claim("roles", roles) // Encode roles separately
                .expiresAt(now.plusSeconds(expirationTimeInSeconds))
                .build();
        String generatedToken = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        System.out.println("Generated Token: " + generatedToken);

        return generatedToken;
    }

    public void setJwtCookie(String token, Users user, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", token);
        cookie.setMaxAge(7 * 24 * 60 * 60); // Set the cookie's expiration time (in seconds), adjust as needed
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to true if your application is served over HTTPS
        cookie.setPath("/");

        System.out.println("setting cookie");
        response.addCookie(cookie);
        System.out.println(cookie);
        System.out.println("cookie set");
        String retrievedToken = getJwtFromCookie();
        System.out.println("Retrieved Token from Cookie: " + retrievedToken);

    }

    private String getJwtFromCookie() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attr.getRequest();

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
