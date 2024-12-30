import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { request, setAuthHeader } from '../helpers/axios_helper';
import LoginForm from './LoginForm';

const Login = () => {

    const navigate = useNavigate(); // Use the useNavigate hook

    const onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                login: username,
                password: password
            }).then(
                (response) => {
                    setAuthHeader(response.data.token);
                    navigate('/'); // Redirect to dashboard on successful login
                }).catch(
                    (error) => {
                        setAuthHeader(null);
                    }
                );
    };

    const onRegister = (e, firstName, lastName, username, password) => {
        setTimeout(100000);
        e.preventDefault();
        request(
            "POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            }).then(
                (response) => {
                    console.log(response);
                    setTimeout(100000);
                    setAuthHeader(response.data.token);
                    navigate('/'); // Redirect to dashboard on successful registration
                }).catch(
                    (error) => {
                        console.log(error);
                        setTimeout(100000);
                        setAuthHeader(null);
                    }
                );
    };

    return (
        <div>
            <header>
                <h1>Login</h1>
            </header>
            <nav>
                <div>
                    <a href="/">Home</a>
                    <a href="/career">Career</a>
                    <a href="/about">About Us</a>
                    {/* <span className="profile-btn" onClick={toggleSidebar}>Profile</span> */}
                </div>
            </nav>
            <div className="container">
                <LoginForm onLogin={onLogin} onRegister={onRegister} />
            </div>
        </div>
    );
};

export default Login;
