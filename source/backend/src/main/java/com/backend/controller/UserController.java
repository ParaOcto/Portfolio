package com.backend.controller;

import com.backend.service.UserService;

import org.springframework.web.bind.annotation.*;

import com.backend.model.Users;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public Users createUser(@RequestBody Users user) {
        return userService.createUser(user);
    }

    @PostMapping("/create-admin")
    public Users createAdmin() {
        Users admin = new Users();
        admin.setUsername("phon_admin");
        admin.setPasswordHash("phon1232005@"); // Sẽ được hash trong service
        admin.setRoleUser("Phon");
        admin.setAvatar("\\source\\frontend\\public");
        
        return userService.createUser(admin);
    }
    @PostMapping("/login")
    public String loginUser(@RequestBody Users user) {
        System.out.println(user);
        return userService.verify(user);
    }
}
