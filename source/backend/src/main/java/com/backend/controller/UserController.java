package com.backend.controller;

import com.backend.service.JWTService;
import com.backend.service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import com.backend.model.Users;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final JWTService jwtService;

    public UserController(UserService userService, JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
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
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Users user) {
        Users foundUser = userService.verify(user); // hàm verify trả về user nếu đúng
        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }

        String token = jwtService.generateToken(foundUser.getUserId(), foundUser.getUsername(), foundUser.getRoleUser(), foundUser.getAvatar());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", foundUser.getUserId());
        response.put("username", foundUser.getUsername());
        response.put("role", foundUser.getRoleUser());
        response.put("avatar", foundUser.getAvatar());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login-anonymous")
    public ResponseEntity<Map<String, Object>> loginAnonymous() {
        
        Users anonymousUser = new Users();
        anonymousUser.setUsername("Anonymous_" + (System.currentTimeMillis() % 100000) + "_" + new Random().nextInt(1000));
        anonymousUser.setPasswordHash("null"); // Sẽ được hash trong service
        anonymousUser.setRoleUser("Anonymous");
        anonymousUser.setAvatar("anonymous.png");
        Users savedUser = userService.createUser(anonymousUser);

        String token = 
            jwtService.generateToken(savedUser.getUserId(), savedUser.getUsername(), savedUser.getRoleUser(), savedUser.getAvatar());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", savedUser.getUserId());
        response.put("username", savedUser.getUsername());
        response.put("role", savedUser.getRoleUser());
        response.put("avatar", savedUser.getAvatar());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/info/{userId}")
    public ResponseEntity<Users> getUserInfo(@PathVariable Long userId) {
        Users user = userService.getInfoByUserId(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

}
