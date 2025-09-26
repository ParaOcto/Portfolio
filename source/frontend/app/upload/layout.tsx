import styles from './upload.module.css';
import Link from 'next/link';
import Navbar from '@/component/Navbar/Navbar';

export default function PostLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}