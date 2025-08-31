import "./globals.css";

export default function loading() {
    return (
        <div className="loading-container">
            <div className="logo-wrapper">
                <div className="spinner"></div>
                <img className="loading-logo" src="/logo.png" alt="Loading..."/>
            </div>
        </div>
    );
}