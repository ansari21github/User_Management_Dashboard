
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for token in localStorage on initial load
        const token = localStorage.getItem('authToken');
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
