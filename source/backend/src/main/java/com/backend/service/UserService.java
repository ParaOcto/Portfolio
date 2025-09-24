package com.backend.service;

import com.backend.model.Users;
import com.backend.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired 
    private JWTService jwtService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    public Users createUser(Users user) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashedPassword);
        return userRepo.save(user);
    }

    public String verify(Users user) {
        Authentication authentication = 
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPasswordHash()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername());
        }
        return "Invalid Credentials";
    }
    
}
