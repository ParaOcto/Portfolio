'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Auth.module.css";

const Auth = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({
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
                userId: userId || '',
                username: username || 'User',
                avatar: avatar || '/default-avatar.png',
                role: role || 'user'
            });
            // Remove automatic redirect - let users stay on current page
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/home');
    };
    
    const handleLogin = () => { router.push('/login'); };
    
    const handleAnonymous = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login-anonymous`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("Anonymous login failed!");
            }
            const data = await res.json();
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("avatar", data.avatar);
            setUserInfo({
                userId: data.userId || '',
                username: data.username || 'Anonymous',
                avatar: data.avatar || '/avatar/anonymous.png',
                role: data.role || 'Anonymous'
            });
            setIsLoggedIn(true);
            router.push("/home");
        }catch (err) {
            console.error(err);
        }
    };
    return (
        <div className={styles.authButtons}>
            {isLoggedIn ? (
                <div className={styles.userInfo}>
                    <div className={styles.userProfile}>
                        <img 
                            src={userInfo.avatar || '/default-avatar.png'} 
                            alt="Avatar"
                            className={styles.avatar}
                        />
                        <span className={styles.username}>{userInfo.username}</span>
                    </div>
                    <button 
                        className={styles.logoutButton} 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    <button 
                        className={styles.loginButton} 
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button 
                        className={styles.anonymousButton} 
                        onClick={handleAnonymous}
                    >
                        Continue as Guest
                    </button>
                </>
            )}
        </div>
    );

}
export default Auth;