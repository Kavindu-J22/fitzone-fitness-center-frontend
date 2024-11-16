// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        // Replace with actual API call and token storage
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        console.log(data);
        
        if (data.user) {
            setUser(data.user); // Set the user state based on response data
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username); // Store username
            localStorage.setItem('userId', data.user.id); // Store user ID
            localStorage.setItem('role', data.user.role);
        } else {
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Remove username from localStorage
        localStorage.removeItem('userId'); // Remove user ID from localStorage
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
