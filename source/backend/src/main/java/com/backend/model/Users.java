package com.backend.model;

// import org.springframework.data.relational.core.mapping.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.sql.Timestamp;

@Table(name = "users") // bảng trong schema
public class Users implements UserDetails {
    @Id
    @Column("userid")
    private Long userId;
    @Column("username")
    private String username;
    @Column("password_hash")
    private String passwordHash;
    @Column("roleuser")
    private String roleUser;
    @Column("avatar")
    private String avatar;
    @Column("created_at")
    private Timestamp createdAt;

    //Constructor
    public Users() {
    }

    public Users(Long userId, String username, String passwordHash, String roleUser, String avatar, Timestamp createdAt) {
        this.userId = userId;
        this.username = username;
        this.passwordHash = passwordHash;
        this.roleUser = roleUser;
        this.avatar = avatar;
        this.createdAt = createdAt;
    }

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

    public String getAvatar() {
        return avatar;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + roleUser));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "Users{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", roleUser='" + roleUser + '\'' +
                ", avatar='" + avatar + '\'' +
                ", createdAt='" + createdAt + '\'' +
                '}';
    }
}
