import styles from './projects.module.css';

const projects = [
    {
        title: 'Portfolio Website',
        description: 'My personal portfolio built with Spring boot, Next.js, React, and modern CSS. Responsive, fast, and beautiful.',
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

export default async function ProjectsPage() {
    await new Promise(res => setTimeout(res, 1000));
    return (
        <div className={styles.projects}>
            <h1 className={styles.heading}>My Projects</h1>
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
        </div>
    );
}