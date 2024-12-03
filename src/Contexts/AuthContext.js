import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../Services/AuthServices';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = authService.getToken();
                const name = localStorage.getItem('name');

                if (token && name) {
                    setUser({ name });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setError(null);
            const response = await authService.login(credentials);
            const { name } = response.data;
            setUser({ name });
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            setError(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: authService.isAuthenticated() }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};