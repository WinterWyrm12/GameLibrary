// Imports 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('regular');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();
    const from = localStorage.state?.from || '/';
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        if (!username.trim() || !password.trim()) {
            setError("Please complete both username and password fields");
            return;
        };
        // mock authentication
        try {
            login(username, password, selectedRole);
            navigate('/favorites');
        } catch (err) {
            setError("Login failed. Please try again.")
        };
        navigate(from, {replace: true});
    };

    return
}