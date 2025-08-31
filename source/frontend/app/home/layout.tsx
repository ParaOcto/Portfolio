import styles from "./home.module.css";
import { ReactNode } from "react";
import Navbar from "../../component/Navbar/Navbar";

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.home}>
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}