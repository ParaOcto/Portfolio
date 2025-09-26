import styles from "./home.module.css";
import { FaInstagram, FaFacebookSquare, FaLinkedin, FaGithub, FaCode, FaRocket, FaHeart } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

const projects = [
    {
        title: 'Portfolio Website',
        description: 'My personal portfolio built with Spring boot, Next.js, React, and modern CSS. The purpose is to learn spring boot and how web works.',
        image: '/projects/portfolio.png',
        tech: ['Spring Boot', 'Next.js', 'React', 'CSS'],
        github: 'https://github.com/ParaOcto/Portfolio',
        demo: 'https://portfolio-demo.com',
    },
    {
        title: 'Pikachu game',
        description: 'A game using C++ and SFML library.',
        image: '/projects/pikachu.png',
        tech: ['SFML', 'C++'],
        github: 'https://github.com/ParaOcto/Pikachu',
        demo: 'https://www.youtube.com/watch?v=H9DHwdbFZgw',
    },
    {
        title: 'MangaNest',
        description: 'Upload and Manage Comics online with user authentication, admin panel, and more.',
        image: '/projects/MangaNest.png',
        tech: ['NestJS', 'React'],
        github: 'https://github.com/lnhatduy-fitus/MangaNest',
        demo: 'https://drive.google.com/file/d/1EdwPM7L9qBlny7TO2MX6MsHsByZugtsE/view?usp=sharing',
    },
];

export default async function Home(){
    await new Promise(res => setTimeout(res, 1000));
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>
                            Hi, I'm <span className={styles.highlight}>Phôn</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Full-Stack Developer & Creative Problem Solver
                        </p>
                        <p className={styles.heroDescription}>
                            Passionate about creating amazing digital experiences with modern technologies
                        </p>
                        <div className={styles.heroStats}>
                            <div className={styles.stat}>
                                <FaCode className={styles.statIcon} />
                                <span>3+ Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <FaRocket className={styles.statIcon} />
                                <span>Always Learning</span>
                            </div>
                            <div className={styles.stat}>
                                <FaHeart className={styles.statIcon} />
                                <span>Love Coding</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <img src="/cover.jpg" alt="Phôn" className={styles.profileImage} />
                        <div className={styles.floatingElements}>
                            <div className={styles.floatingElement1}></div>
                            <div className={styles.floatingElement2}></div>
                            <div className={styles.floatingElement3}></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className={styles.welcome}>
                <h1 className={styles.sectionTitle}>About Me</h1>
                <div className={styles.welcomeSection}>
                    
                    <div className = {styles.leftWelcome}>
                        <img src="/cover2.jpg" alt="My Skills" className={styles.cover} />
                        <h1 className={styles.welcomeTitle}>My Skills</h1>
                        <p className={styles.skillDescription}>
                            Technologies I work with to bring ideas to life
                        </p>
                        <div className={styles.skillsLogoRow}>
                            <img src="/skills/springboot.png" alt="Spring Boot" className={styles.skillLogo} title="Spring Boot" />
                            <img src="/skills/nextjs.svg" alt="Next.js" className={styles.skillLogo} title="Next.js" />
                            <img src="/skills/html.png" alt="HTML5" className={styles.skillLogo} title="HTML5" />
                            <img src="/skills/css.png" alt="CSS3" className={styles.skillLogo} title="CSS3" />
                        </div>
                    </div>
                    <div className ={styles.centerWelcome}>
                        <img src="/cover.jpg" alt="About Me" className={styles.cover} />
                        <h1 className={styles.welcomeTitle}>About Me</h1>
                        <p className={styles.welcomeDescription}>
                            A passionate developer who loves creating beautiful and functional web applications. 
                            Always eager to learn new technologies and solve challenging problems.
                        </p>
                    </div>
                    <div className={styles.rightWelcome}>
                        <img src="/cover3.jpg" alt="Connect with Me" className={styles.cover} />
                        <h1 className={styles.welcomeTitle}>Connect</h1>
                        <p className={styles.socialDescription}>
                            Let's connect and collaborate!
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://www.instagram.com/nphon_25/" target="_blank" rel="noopener noreferrer" title="Instagram" className={styles.socialIcon} style={{color: '#E4405F'}}><FaInstagram size={36}/></a>
                            <a href="https://www.facebook.com/nguyen.ang.phon/" target="_blank" rel="noopener noreferrer" title="Facebook" className={styles.socialIcon} style={{color: '#1877F3'}}><FaFacebookSquare size={38}/></a>
                            <a href="https://www.linkedin.com/in/ph%C3%B4n-nguy%E1%BB%85n-%C4%91%C4%83ng-142805339/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className={styles.socialIcon} style={{color: '#0A66C2'}}><FaLinkedin size={36}/></a>
                            <a href="https://www.threads.net/@nphon_25" target="_blank" rel="noopener noreferrer" title="Threads" className={styles.socialIcon} style={{color: '#000'}}><SiThreads size={34}/></a>
                            <a href="https://github.com/ParaOcto" target="_blank" rel="noopener noreferrer" title="GitHub" className={styles.socialIcon} style={{color: '#000'}}><FaGithub size={34}/></a>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.projects}>
                <h1 className={styles.sectionTitle}>My Projects</h1>
                <div className={styles.grid}>
                    {projects.map((project, idx) => (
                        <div className={styles.card} key={idx}>
                            <div className={styles.imageWrapper}>
                                <img src={project.image} alt={project.title} className={styles.image} />
                            </div>
                            <h2 className={styles.title}>{project.title}</h2>
                            <p className={styles.desc}>{project.description}</p>
                            <div className={styles.techList}>
                                {project.tech.map((t, i) => (
                                    <span className={styles.tech} key={i}>{t}</span>
                                ))}
                            </div>
                            <div className={styles.links}>
                                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>Live Demo</a>}
                                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>GitHub</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
