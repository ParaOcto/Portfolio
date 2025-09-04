import styles from './projects.module.css'

import Navbar from '@/component/Navbar/Navbar';
// import Footer from '@/component/Footer/Footer';

export default function ProjectsPage({children}: {children: React.ReactNode}) {
    return (
        <div className={styles.projects}>
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
}