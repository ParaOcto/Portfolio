import styles from "./Footer.module.css";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerColumn}>
                    <h3 className={styles.footerHeading}>Social</h3>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaFacebook /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaLinkedin /></a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaGithub /></a>
                    </div>
                </div>
                <div className={styles.footerColumn}>
                    <h3 className={styles.footerHeading}>Quick Access</h3>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/uploading">Uploading</Link></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h3 className={styles.footerHeading}>Information</h3>
                    <ul className={styles.footerLinks}>
                        <li>University of Science - VNU</li>
                        <li>Nguyễn Đăng Phôn</li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
            </div>
        </footer>
    );
}