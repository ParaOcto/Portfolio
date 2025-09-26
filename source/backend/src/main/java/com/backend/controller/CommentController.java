package com.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.Comments;
import com.backend.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    
    @Autowired
    private CommentService commentService;

    @PostMapping("/add")
    public String addComment(@RequestBody Comments commentRequest) {
        Comments comment = new Comments(commentRequest.getPostId(), commentRequest.getUserId(), commentRequest.getContent());
        // Logic to save the comment to the database
        // You might want to create a CommentService and CommentRepo similar to PostService and PostRepo
        commentService.createComment(comment);
        return "Comment added successfully";
    }

    @GetMapping("/all/post/{postId}")
    public List<Comments> getCommentsByPostId(@PathVariable Long postId) {
        List<Comments> comments = new ArrayList<>();
        commentService.getCommentsByPostId(postId).forEach(comments::add);

        return comments;
    }


}
