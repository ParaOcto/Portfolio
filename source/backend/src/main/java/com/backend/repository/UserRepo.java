
package com.backend.repository;

import com.backend.model.Users;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends CrudRepository<Users, Long> {
    Users findByUsername(String username);
    Users getInfoByUserId(Long userId);
}
