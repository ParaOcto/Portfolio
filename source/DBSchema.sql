DROP DATABASE IF EXISTS Phon;
GO

CREATE DATABASE Phon;
GO

USE Phon;
GO

CREATE TABLE users (
	userId INT IDENTITY(1,1) PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password_hash VARCHAR(100) NOT NULL,
	roleUser VARCHAR(15) CHECK (roleUser IN ('Phon', 'Anonymous'))
);
GO

CREATE TABLE post (
	postId INT IDENTITY(1,1) PRIMARY KEY,
	userId INT NOT NULL,
	content TEXT,
	createdAt DATE,
	imageUrl VARCHAR(200),
	FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE [comment] (
	commentId INT IDENTITY(1,1) PRIMARY KEY,
	postId INT NOT NULL,
	userId INT NOT NULL,
	content TEXT,
	createdAt DATE,
	FOREIGN KEY (postId) REFERENCES post(postId),
	FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

INSERT INTO users (username, password_hash, roleUser)
VALUES ('NguyenDangPhon', 'personalproject', 'Phon');
GO
