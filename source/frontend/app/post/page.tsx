'use client';
import styles from './post.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState({
        token: '',
        userId: '',
        username: '',
        avatar: '',
        role: ''
    });
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
        const avatar = localStorage.getItem('avatar');
        const username = localStorage.getItem('username');
        if (token) {
            setIsLoggedIn(true);
            setUserInfo({
                token: token,
                userId: userId || '',
                username: username || 'User',
                avatar: avatar || '/default-avatar.png',
                role: role || 'user'
            });
        }
        // Call fetchPosts after userInfo is set
    }, []);

    useEffect(() => {
        // Fetch posts when userInfo changes
        if (userInfo.token) {
            fetchPosts();
        } else {
            // If no token, still try to fetch posts (for public posts)
            fetchPosts();
        }
    }, [userInfo.token]);

    const fetchPosts = async () => {    
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/all`, {
                method: "GET",
                // send with token to authenticate
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch posts.");
            }
            const posts = await res.json();
            setPosts(posts);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }else {
                setError("Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }
    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Blog Posts</h1>
            {isLoggedIn && (
                <div className={styles.userInfo}>
                    <img src={userInfo.avatar} alt="Avatar" className={styles.avatar} />
                    <span className={styles.username}>Hello, {userInfo.username}!</span>
                    {userInfo.role === 'admin' && (
                        <Link href="/post/create" className={styles.createButton}>Create New Post</Link>
                    )}
                </div>
            )}
            <div className={styles.postList}>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={post.id || index} className={styles.postCard}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                            <p className={styles.postContent}>{post.content}</p>
                            <p className={styles.postDate}>By: {post.createdAt || 'Unknown'}</p>
                            <img className={styles.postImg} src={post.image}></img>
                        </div>
                    ))
                ) : (
                    <div className={styles.noPosts}>No posts available.</div>
                )}
            </div>
        </div>
    );
}