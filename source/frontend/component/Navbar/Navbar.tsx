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
                <Link href="/projects" className={styles.navLink}>Projects</Link>
                <Link href="/post" className={styles.navLink}>Post</Link>
                <Link href="/upload" className={styles.navLink}>Upload</Link>
            </div>
            <div className={styles.Authentication}> 
                <Auth />
            </div>
        </header>
    );
}