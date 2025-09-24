package com.backend.service;

import com.backend.model.Users;
import com.backend.repository.UserRepo;
import com.backend.model.MyUserDetails;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public MyUserDetails loadUserByUsername(String username) {
        Users user = userRepo.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return new MyUserDetails(user);
    }

}
