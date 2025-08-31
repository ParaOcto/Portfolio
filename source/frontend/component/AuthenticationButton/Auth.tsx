'use client';

import { useRouter } from "next/navigation";
import styles from "./Auth.module.css";

const Auth = () => {
    const router = useRouter();

    const handleLogin = () => { router.push('/login'); };
    // const handleSignup = () => { router.push('/signup'); };
    return (
        <div className={styles.authButtons}>
            <button className={styles.loginButton} onClick={handleLogin}>Login</button>
            {/* <button className={styles.signupButton} onClick={handleSignup}>Sign Up</button> */}
            <button className={styles.anonymousButton} onClick={() => router.push('/home')}>Continue as Guest</button>
        </div>
    );
}
export default Auth;