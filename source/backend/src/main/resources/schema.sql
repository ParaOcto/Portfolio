CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    roleUser VARCHAR(15) CHECK (roleUser IN ('Phon', 'Anonymous'))
);

CREATE TABLE IF NOT EXISTS post (
    postId INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE IF NOT EXISTS comment (
    commentId INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    postId INT,
    userId INT,
    FOREIGN KEY (postId) REFERENCES post(postId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);
