package com.example.backend.utilities;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class KeyGeneratorUtility {



    public static KeyPair generateRSAKey() {
        KeyPair keyPair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair(); // This line was missing
        } catch (Exception e) {
            throw new IllegalStateException("Error generating RSA key pair", e);
        }
        return keyPair;
    }
}
