import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { request, setAuthHeader } from '../helpers/axios_helper';
import Buttons from './Buttons';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import WelcomeContent from './WelcomeContent';

const AppContent = () => {
    const [componentToShow, setComponentToShow] = useState("welcome");
    const navigate = useNavigate(); // Use the useNavigate hook

    const login = () => {
        setComponentToShow("login");
    };

    const logout = () => {
        setComponentToShow("welcome");
        setAuthHeader(null);
        navigate('/'); // Redirect to home on logout
    };

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
                    setComponentToShow("messages");
                    navigate('/'); // Redirect to dashboard on successful login
                }).catch(
                    (error) => {
                        setAuthHeader(null);
                        setComponentToShow("welcome");
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
                    setComponentToShow("messages");
                    navigate('/'); // Redirect to dashboard on successful registration
                }).catch(
                    (error) => {
                        console.log(error);
                        setTimeout(100000);
                        setAuthHeader(null);
                        setComponentToShow("welcome");
                    }
                );
    };

    return (
        <>
            <Buttons
                login={login}
                logout={logout}
            />
            {componentToShow === "welcome" && <WelcomeContent />}
            {componentToShow === "login" && <LoginForm onLogin={onLogin} onRegister={onRegister} />}
            {componentToShow === "messages" && <AuthContent navigate={navigate("/")} />} {/* Pass navigate as a prop */}
        </>
    );
};

export default AppContent;
