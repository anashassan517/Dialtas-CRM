// src/hooks/useAuthBackend.js
import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import auth from 'src/configs/auth';
import Router, { useRouter } from 'next/router';

const AuthBackendContext = createContext();

export const AuthBackendProvider = ({ children }) => {
    const router = useRouter();
    const authConfig = auth;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const initAuth = async () => {
    //         const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
    //         if (storedToken) {
    //             setLoading(true);
    //             try {
    //                 const response = await axios.get(authConfig.meEndpoint, {
    //                     headers: {
    //                         Authorization: storedToken,
    //                     },
    //                 });
    //                 setLoading(false);
    //                 setUser({ ...response.data.userData });
    //             } catch (error) {
    //                 console.error('Error fetching user data:', error);
    //                 // Handle 401 (Unauthorized) by redirecting to the login page
    //                 if (error.response && error.response.status === 401) {
    //                     handleLogout(); // Define handleLogout function
    //                 }
    //                 setLoading(false);
    //             }
    //         } else {
    //             setLoading(false);
    //         }
    //     };
    //     initAuth();
    // }, []);

    // const handleLogin = async ({ email, password, rememberMe }) => {
    //     try {
    //         console.log("handlelogin :src/hooks/useauthbackend called");
    //         const response = await axios.post(authConfig.loginEndpoint, { email, password });
    //         console.log("handlelogin :src/hooks/useauthbackend response:", response);

    //         // Update user state or perform any other necessary actions
    //         const userData = response.data.userData;
    //         setUser(userData);
    //         // Store the token in localStorage if needed
    //         if (rememberMe) {
    //             window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
    //             window.localStorage.setItem('userData', JSON.stringify(userData));
                

    //         }
    //         router.push('/dashboard/sales')
    //         return true;
    //     } catch (error) {
    //         // Handle login error
    //         console.error('Login error:', error);
    //         throw error; // Propagate the error to the component for further handling
    //     }
    // };


    const handleLogin = async ({ email, password, rememberMe }) => {
        try {
            console.log("handlelogin :src/hooks/useauthbackend called");
            const response = await axios.post(authConfig.loginEndpoint, { email, password });
            console.log("handlelogin :src/hooks/useauthbackend response:", response);
    
            // Update user state or perform any other necessary actions
            const userData = response.data.userData;
            setUser(userData);
            
            // Store the token in localStorage if needed
            if (rememberMe) {
                window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
                window.localStorage.setItem('userData', JSON.stringify(userData));
            }
    
            return true; // Indicate successful login
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
            throw error; // Propagate the error to the component for further handling
        }
    };
    
    const handleLogout = () => {
        setUser(null);
        // Clear token from localStorage if needed
        window.localStorage.removeItem(authConfig.storageTokenKeyName);
        // Redirect to the login page
        router.replace('/login'); // Change the path as needed
    };

    const values = {
        user,
        loading,
        handleLogin,
        logout: handleLogout,
    };

    return <AuthBackendContext.Provider value={values}>{children}</AuthBackendContext.Provider>;
};

export const useAuthBackend = () => useContext(AuthBackendContext);




//above well. For consistent auth=useauth()
// src/hooks/useAuthBackend.js
// import { useContext } from 'react';
// import { AuthContext } from 'src/context/AuthContext';
// import axios from 'axios';

// export const useAuthBackend = () => {
//   const { login, logout } = useContext(AuthContext);

//   const handleBackendLogin = async (params, errorCallback) => {
//     try {
//       const response = await axios.post('/api/login', params);
//       const { accessToken, userData } = response.data;

//       // Use login method from AuthContext to set user and token
//       login({ accessToken, userData, rememberMe: params.rememberMe });

//       return userData;
//     } catch (error) {
//       if (errorCallback) errorCallback(error);
//     }
//   };

//   return {
//     login: handleBackendLogin,
//     logout,
//   };
// };
