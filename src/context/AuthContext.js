// // src/context/AuthContext.js
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import authConfig from 'src/configs/auth';
import { useAuthBackend } from 'src/hooks/useAuth';

const defaultProvider = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
   const { user,
     loading,
      setUser,
       setLoading,
        login, logout } = useAuthBackend();
  const router = useRouter();

  
  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login,
    logout,
  };
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
  
    // Redirect to the login page
    router.push('/login');
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };


// src/context/AuthContext.js
// import { createContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import authConfig from 'src/configs/auth';
// import { useAuthBackend } from 'src/hooks/useAuthBackend';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const { user, loading, setUser, setLoading, login, logout } = useAuthBackend();
//   const router = useRouter();

//   const handleLogout = () => {
//     setUser(null);
//     window.localStorage.removeItem('userData');
//     window.localStorage.removeItem(authConfig.storageTokenKeyName);

//     // Redirect to the login page
//     router.push('/login');
//   };

//   useEffect(() => {
//     const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);

//     if (storedToken) {
//       setLoading(true);
//       axios
//         .get(authConfig.meEndpoint, {
//           headers: {
//             Authorization: storedToken,
//           },
//         })
//         .then((response) => {
//           setLoading(false);
//           setUser({ ...response.data.userData });
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);

//           // Handle 401 (Unauthorized) by redirecting to the login page
//           if (error.response && error.response.status === 401) {
//             handleLogout();
//           }

//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };

// export { AuthContext, AuthProvider };
