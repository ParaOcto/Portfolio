package com.backend.model;

import org.springframework.data.relational.core.mapping.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;


@Table(name = "users") // bảng trong MySQL
public class User {
    @Id
    @Column("userId")
    private Long userId;
    @Column("username")
    private String username;
    @Column("password_hash")
    private String passwordHash;
    @Column("roleUser")
    private String roleUser;

    // Getters & Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getRoleUser() {
        return roleUser;
    }
    public void setRoleUser(String roleUser) {
        this.roleUser = roleUser;
    }
}
