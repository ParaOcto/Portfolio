package com.backend.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


public class MyUserDetails implements UserDetails {
    private Users user;

    public MyUserDetails(Users user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
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
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // lấy role từ DB (ví dụ field roleUser trong entity)
        String role = user.getRoleUser();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        // chuẩn convention Spring: role nên có prefix "ROLE_"
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }
    
}
