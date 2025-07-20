
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Authservice from '../services/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const[isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); 
    useEffect(() => {
       const currentUser = Authservice.getCurrentUser();
       setUser(currentUser);
       setIsLoading(false);
    }, []);
    const login = async (email, password) => {
        try {
            const response = await Authservice.login(email, password);
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Login failed');
        }
    };

    const register = async (userData) => {
        try {
            const response = await Authservice.register(userData);
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Registration failed');
        }
    };

    const setUserInformation = (token) => {
        setUser(token);
        return;
    };

    const logout = () => {
        Authservice.logout();
        setUser(null);
        navigate('/login');
    };
    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading, setUserInformation }}>
            {children}
        </AuthContext.Provider>
    );

};
export const useAuth= () => useContext(AuthContext);