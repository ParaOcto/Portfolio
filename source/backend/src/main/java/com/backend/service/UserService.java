package com.backend.service;

import com.backend.model.Users;
import com.backend.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    public Users createUser(Users user) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashedPassword);
        return userRepo.save(user);
    }

    public Users verify(Users user) {
        Users foundUser = userRepo.findByUsername(user.getUsername());

        if (foundUser != null && passwordEncoder.matches(user.getPasswordHash(), foundUser.getPasswordHash())) {
            return foundUser;
        }
        return null;
    }

    public Users getInfoByUserId(Long userId) {
        return userRepo.getInfoByUserId(userId);
    }

    
}
