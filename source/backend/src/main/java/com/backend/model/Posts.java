package com.backend.model;

import java.sql.Timestamp;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "posts") // bảng trong schema
public class Posts {
    @Id
    @Column("postid")
    private Long postId;
    @Column("content")
    private String content;
    @Column("image")
    private String image;
    @Column("created_at")
    private Timestamp createdAt;
    @Column("title")
    private String title;

    //Constructor
    public Posts() {
    }
    public Posts(Long postId, String content, String image, Timestamp createdAt, String title) {
        this.postId = postId;
        this.content = content;
        this.image = image;
        this.createdAt = createdAt;
        this.title = title;
    }

    // Getters & Setters
    public Long getPostId() {
        return postId;
    }
    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    
}
