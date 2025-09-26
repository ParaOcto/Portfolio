package com.backend.repository;

import com.backend.model.Posts;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends CrudRepository<Posts, Long> {
}
