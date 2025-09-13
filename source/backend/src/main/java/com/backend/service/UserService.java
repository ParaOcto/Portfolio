package com.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.backend.model.User;
import com.backend.repository.UserRepo;

@Service
public class UserService {
    private final UserRepo userRepo;
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public Iterable<User> getAllUsers() {
        return userRepo.findAll();
    }
}
