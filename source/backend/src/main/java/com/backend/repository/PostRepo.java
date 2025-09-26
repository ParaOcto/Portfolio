package com.backend.repository;

import com.backend.model.Posts;

import org.springframework.data.repository.CrudRepository;

public interface PostRepo extends CrudRepository<Posts, Long> {
}
