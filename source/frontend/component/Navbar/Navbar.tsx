"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";

import Auth from "../AuthenticationButton/Auth";

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/home">
                    <img src="/logo.png" alt="Logo" className={styles.logoImage} />
                </Link>
            </div>
            <div className={styles.navLinks}>
                <Link href="/about" className={styles.navLink}>About</Link>
                <Link href="/projects" className={styles.navLink}>Projects</Link>
                <Link href="/uploading" className={styles.navLink}>Uploading</Link>
                <Link href="/uploaded" className={styles.navLink}>Uploaded</Link>
            </div>
            <div className={styles.Authentication}> 
                <Auth />
            </div>
        </header>
    );
}