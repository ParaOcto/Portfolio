package com.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.model.Posts;
import com.backend.service.PostService;
import com.cloudinary.Cloudinary;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private Cloudinary cloudinary;

    // endpoints for post to cloundinary and save to db
    @PostMapping("/upload")
    public Map<String, Object> uploadPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("image") MultipartFile image) {
        try {
            // Upload image to Cloudinary (không dùng folder)
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    image.getBytes(),
                    Map.of("resource_type", "auto")
            );

            // Lấy URL của ảnh vừa upload
            String imageUrl = (String) uploadResult.get("secure_url");

            // Tạo post mới
            Posts post = new Posts();
            post.setTitle(title);
            post.setContent(content);
            post.setImage(imageUrl);

            // Lưu vào DB
            postService.createPost(post);

            return Map.of(
                    "message", "Post created successfully",
                    "post", post
            );
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", "Failed to create post");
        }
    }

    @GetMapping("/all")
    public List<Posts> getAllPosts() {
        List<Posts> posts = new ArrayList<>();
        postService.getAllPosts().forEach(posts::add);
        return posts;
    }


}
