import React, { useState, useEffect } from 'react';
import AuthContent from './AuthContent';

function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setIsLoggedIn(!!token); 
    }, []);

   
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                let userId = 1; 
                const token = localStorage.getItem('auth_token'); 

                const response = await fetch(`/api/username/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsername(data.username || ''); 
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

       
        if (sidebarVisible && isLoggedIn) {
            fetchUsername();
        }
    }, [sidebarVisible, isLoggedIn]);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

   
    const handleLogin = () => {
        
    };

   
    const handleLogout = () => {
        localStorage.removeItem('auth_token'); 
        setIsLoggedIn(false);
        setUsername(''); 
    };

    return (
        <div>
            <header>
                <h1>Home</h1>
            </header>

            <nav>
                <div>
                    <a href="/">Home</a>
                    <a href="/career">Career</a>
                    <a href="/about">About Us</a>
                    {isLoggedIn && (
            <span className="profile-btn" onClick={toggleSidebar}>Profile</span>
        )}
                </div>

                {!isLoggedIn ? (
                    <a href="/login" className="btn bg-success" onClick={handleLogin}>Login</a>
                ) : (
                    <a href="/" className="logout-btn" onClick={handleLogout}>Logout</a>
                )}
            </nav>

            <div className={`sidebar ${sidebarVisible ? 'show' : ''}`} id="profileSidebar">
                <span className="close-btn" onClick={toggleSidebar}>&times;</span>
                <h3>Profile Details</h3>
                <p><strong>Username:</strong> {username || 'Loading...'}</p>
                <p><strong>Password:</strong> ******</p>
            </div>

            <div className="container">
                {!isLoggedIn ? (
                    <h2>Please Login !!!</h2>
                ) : (
                    <h2>Welcome Back!
                        <AuthContent />
                    </h2>
                )}
            </div>

            <footer></footer>
        </div>
    );
}

export default Home;
