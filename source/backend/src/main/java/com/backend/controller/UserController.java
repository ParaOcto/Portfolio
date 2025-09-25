package com.backend.controller;

import com.backend.service.JWTService;
import com.backend.service.UserService;

import java.util.HashMap;
import java.util.Map;

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
        anonymousUser.setUsername("Anonymous");
        anonymousUser.setPasswordHash("null"); // Sẽ được hash trong service
        anonymousUser.setRoleUser("Anonymous");
        anonymousUser.setAvatar("\\source\\frontend\\public\\avatar\\anonymous.png");

        String token = jwtService.generateToken(anonymousUser.getUserId(), anonymousUser.getUsername(), anonymousUser.getRoleUser(), anonymousUser.getAvatar());
        userService.createUser(anonymousUser);
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", anonymousUser.getUserId());
        response.put("username", anonymousUser.getUsername());
        response.put("role", anonymousUser.getRoleUser());
        response.put("avatar", anonymousUser.getAvatar());

        return ResponseEntity.ok(response);
    }


}
