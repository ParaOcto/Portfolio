'use client';

import { useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginLayout() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Validate inputs
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            // Call your login API
            const res = await fetch('${env.backend_host}/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || 'Login failed');
                return;
            }

            const data = await res.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                // Use Next.js router instead of window.location
                window.location.href = '/home';
            } else {
                setError('No token received');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <div className={styles.logoContainer}>
                    <Image src="/logo.png" alt="Logo" width={100} height={100} />
                </div>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.inputLabel}>Username</label>
                        <div className={styles.inputWrapper}>
                            <FaUser className={styles.inputIcon} />
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username..."
                                className={styles.inputField}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.inputLabel}>Password</label>
                        <div className={styles.inputWrapper}>
                            <FaLock className={styles.inputIcon} />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password..."
                                className={styles.inputField}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" onClick={togglePasswordVisibility} className={styles.togglePasswordButton}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
            </div>
        </div>
    );
}
