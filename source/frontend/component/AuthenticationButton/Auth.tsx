'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Auth.module.css";

const Auth = () => {
    const router = useRouter();
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const avatar = localStorage.getItem('avatar');
        
        if (token) {
            setIsLoggedIn(true);
            router.push('/home'); // Redirect to home if already logged in
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/home');
    };
    

    const handleLogin = () => { router.push('/login'); };
    // const handleSignup = () => { router.push('/signup'); };
    return (
        <div className={styles.authButtons}>
            {isLoggedIn ? (
                <>
                    <button 
                        className={styles.profileButton} 
                        onClick={() => router.push('/profile')}
                    >
                        Profile
                    </button>
                    <button 
                        className={styles.logoutButton} 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
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
                        onClick={() => router.push('/home')}
                    >
                        Continue as Guest
                    </button>
                </>
            )}
        </div>
    );

}
export default Auth;