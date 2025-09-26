package com.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.model.Posts;
import com.backend.repository.PostRepo;

@Service
public class PostService {
    @Autowired
    private PostRepo postRepo;

    public Posts createPost(Posts post) {
        // Logic to save the post to the database
        return postRepo.save(post);
    }

    public Iterable<Posts> getAllPosts() {
        return postRepo.findAll();
    }
}
