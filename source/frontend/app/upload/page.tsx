'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './upload.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function CameraAutoRender() {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const token = localStorage.getItem('token') || '';

    // Check authorization
    useEffect(() => {
        const checkAuth = () => {
            const role = localStorage.getItem('role');
            const token = localStorage.getItem('token');
            
            if (!token) {
                router.push('/login');
                return;
            }
            
            if (role !== 'Phon') {
                router.push('/post');
                return;
            }
            
            setIsAuthorized(true);
            setLoading(false);
        };

        checkAuth();
    }, [router]);

  // Khi component render -> bật camera (chỉ khi đã được authorize)
    useEffect(() => {
        if (!isAuthorized) return;
        
        const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
            videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Không thể mở camera:", err);
        }
        };
        startCamera();
    }, [isAuthorized]);

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
            context.drawImage(videoRef.current, 0, 0, 300, 200);
            const dataUrl = canvasRef.current.toDataURL("image/png");
            setPhoto(dataUrl);
        }
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPhoto(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Vui lòng chọn file ảnh!');
            }
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const uploadPosts = async () => {
        if (!photo || !title.trim() || !content.trim()) {
            alert('Vui lòng chụp ảnh và nhập đầy đủ tiêu đề và nội dung!');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        const response = await fetch(photo); // photo là dataURL
        const blob = await response.blob();
        const file = new File([blob], "capture.png", { type: "image/png" });
        formData.append("image", file);

        await new Promise(res => setTimeout(res, 1000));
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/upload`, {
                method: "POST",
                headers: {
                    // "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            console.log("Upload successful:", data);
            alert('Tải ảnh lên thành công!');
            // Reset form
            setPhoto(null);
            setTitle('');
            setContent('');
        } catch (err) {
            console.error("Upload failed:", err);
            alert('Tải ảnh lên thất bại!');
        }
    };
    

    // Loading or unauthorized states
    if (loading) {
        return (
            <div className={styles.cameraContainer}>
                <div className={styles.loading}>
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className={styles.cameraContainer}>
                <div className={styles.unauthorized}>
                    <h2>🚫 Access Restricted</h2>
                    <p>This page is only accessible to users with 'Phon' role.</p>
                    <p>Please contact an administrator if you believe this is an error.</p>
                    <button 
                        onClick={() => router.push('/post')} 
                        className={styles.backButton}
                    >
                        Back to Posts
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cameraContainer}>
            <div className={styles.title}>
                <FontAwesomeIcon icon={faCameraRetro} />
                <h1 className={styles.titleMain}>Camera Capture</h1>
            </div>
            <p className={styles.instructions}>
                Vị trí camera của bạn và nhấn nút chụp để chụp ảnh
            </p>
        
            {/* Camera hiển thị trực tiếp */}
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className={styles.videoPreview} 
            />

        <canvas 
            ref={canvasRef} 
            width={300} 
            height={200} 
            className={styles.hidden} 
        />

        {/* Buttons container */}
        <div className={styles.buttonsContainer}>
            <button
                onClick={takePhoto}
                className={styles.cameraButton}
            >
                <FontAwesomeIcon icon={faCameraRetro} />
                Chụp ảnh
            </button>

            <button
                onClick={triggerFileUpload}
                className={styles.uploadFileButton}
            >
                <FontAwesomeIcon icon={faUpload} />
                Chọn ảnh
            </button>
        </div>

        {/* Hidden file input */}
        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className={styles.hidden}
        />

            {photo && (
                <div className={styles.uploadSection}>
                    <h3 className={styles.uploadTitle}>Ảnh đã chụp:</h3>
                    <img 
                        src={photo} 
                        alt="Ảnh chụp" 
                        className={styles.photoPreview} 
                    />
                    
                    {/* Form upload */}
                    <div className={styles.uploadForm}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Tiêu đề bài viết:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Nhập tiêu đề cho bài viết..."
                                className={styles.inputField}
                            />
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Nội dung bài viết:</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Nhập nội dung cho bài viết..."
                                className={styles.textareaField}
                                rows={4}
                            />
                        </div>
                        
                        <button
                            onClick={uploadPosts}
                            className={styles.uploadButton}
                        >
                            <FontAwesomeIcon icon={faCameraRetro} />
                            Tải ảnh lên
                        </button>
                    </div>
                </div>
            )}
        </div>
        );
}
