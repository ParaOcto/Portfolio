import styles from './login.module.css';
import Link from 'next/link';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}