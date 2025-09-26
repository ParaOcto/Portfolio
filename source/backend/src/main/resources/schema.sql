CREATE TABLE IF NOT EXISTS users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(100),
    role_user VARCHAR(20), -- <--- varchar để lưu enum
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng post
CREATE TABLE IF NOT EXISTS posts (
    postId SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng comment
CREATE TABLE IF NOT EXISTS comments (
    commentId SERIAL PRIMARY KEY,
    postId INT REFERENCES posts(postId) ON DELETE CASCADE,
    userId INT REFERENCES users(userId) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);