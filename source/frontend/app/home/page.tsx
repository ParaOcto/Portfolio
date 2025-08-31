import styles from "./home.module.css";

export default async function Home(){
    // Thêm delay 2 giây để test loading
    await new Promise(res => setTimeout(res, 1000));
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to My Portfolio</h1>
            <p className={styles.description}>
                Explore my projects and skills.
            </p>
        </div>
    );
}
