package com.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.model.Comments;
import com.backend.repository.CommentRepo;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    //Get all comments of a post
    public Iterable<Comments> getCommentsByPostId(Long postId) {
        return commentRepo.findAll(); // You might want to implement a custom query in CommentRepo to filter by postId
    }   

    public Comments createComment(Comments comment) {
        // Logic to save the comment to the database
        return commentRepo.save(comment);
    }
}
