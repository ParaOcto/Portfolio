import styles from "./home.module.css";
import { FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { SiThreads } from "react-icons/si";



export default async function Home(){
    // Thêm delay 2 giây để test loading
    await new Promise(res => setTimeout(res, 1000));
    return (
        <div className={styles.container}>
            <section className={styles.welcomeSection}>
                <div className = {styles.leftWelcome}>
                    <img src="/cover2.jpg" alt="Logo" className={styles.cover} />
                    <h1 className={styles.welcomeTitle}>My Skills</h1>
                    <p className={styles.description}>
                    </p>
                    <div className={styles.skillsLogoRow}>
                        <img src="/skills/springboot.png" alt="Spring Boot" className={styles.skillLogo} title="Spring Boot" />
                        <img src="/skills/nextjs.svg" alt="React" className={styles.skillLogo} title="React" />
                        <img src="/skills/html.png" alt="HTML5" className={styles.skillLogo} title="HTML5" />
                        <img src="/skills/css.png" alt="CSS3" className={styles.skillLogo} title="CSS3" />
                    </div>
                </div>
                <div className ={styles.centerWelcome}>
                    <img src="/cover.jpg" alt="Logo" className={styles.cover} />
                    <h1 className={styles.welcomeTitle}>Welcome to My Portfolio</h1>
                    <p className={styles.welcomeDescription}>
                        Explore my projects, read my posts, and stay updated with my latest work.
                    </p>
                </div>
                <div className={styles.rightWelcome}>
                    <img src="/cover3.jpg" alt="Logo" className={styles.cover} />
                    <h1 className={styles.welcomeTitle}>My Socials</h1>
                    <div className={styles.socialLinks}>
                        <a href="https://www.instagram.com/nphon_25/" target="_blank" rel="noopener noreferrer" title="Instagram" className={styles.socialIcon} style={{color: '#E4405F'}}><FaInstagram size={36}/></a>
                        <a href="https://www.facebook.com/nguyen.ang.phon/" target="_blank" rel="noopener noreferrer" title="Facebook" className={styles.socialIcon} style={{color: '#1877F3'}}><FaFacebookSquare size={38}/></a>
                        <a href="https://www.linkedin.com/in/ph%C3%B4n-nguy%E1%BB%85n-%C4%91%C4%83ng-142805339/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className={styles.socialIcon} style={{color: '#0A66C2'}}><FaLinkedin size={36}/></a>
                        <a href="https://www.threads.net/@nphon_25" target="_blank" rel="noopener noreferrer" title="Threads" className={styles.socialIcon} style={{color: '#000'}}><SiThreads size={34}/></a>

                    </div>
                </div>
            </section>
        </div>
    );
}
