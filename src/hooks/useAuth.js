// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';
import axios from 'axios';

export const useAuth = () => useContext(AuthContext);

export const useAuthBackend = () => {
    const { login, logout } = useAuth();

    const handleBackendLogin = async (params, errorCallback) => {
        try {
            const response = await axios.post('/api/login', params);
            const { accessToken, userData } = response.data;

            // Use login method from AuthContext to set user and token
            login({ accessToken, userData, rememberMe: params.rememberMe });

            return userData;
        } catch (error) {
            if (errorCallback) errorCallback(error);
        }
    };

    return {
        ...useAuth(),
        login: handleBackendLogin,
    };
};

