package com.backend.repository;

import org.springframework.data.repository.CrudRepository;
import com.backend.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
