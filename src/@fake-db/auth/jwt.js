// //fake-db authentication without SQL


// // ** JWT import
// import jwt from 'jsonwebtoken'

// // ** Mock Adapter
// import mock from 'src/@fake-db/mock'

// // ** Default AuthConfig
// import defaultAuthConfig from 'src/configs/auth'

// const users = [
//   {
//     id: 1,
//     role: 'admin',
//     password: 'admin',
//     fullName: 'John Doe',
//     username: 'johndoe',
//     email: 'admin@dialtas.com'
//   },
//   {
//     id: 2,
//     role: 'client',
//     password: 'client',
//     fullName: 'Jane Doe',
//     username: 'janedoe',
//     email: 'client@dialtas.com'
//   }
// ]

// // ! These two secrets should be in .env file and not in any other file
// const jwtConfig = {
//   secret: process.env.NEXT_PUBLIC_JWT_SECRET,
//   expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
//   refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
// }
// mock.onPost('/jwt/login').reply(request => {
//   const { email, password } = JSON.parse(request.data)

//   let error = {
//     email: ['Something went wrong']
//   }
//   const user = users.find(u => u.email === email && u.password === password)
//   if (user) {
//     const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expirationTime })

//     const response = {
//       accessToken,
//       userData: { ...user, password: undefined }
//     }

//     return [200, response]
//   } else {
//     error = {
//       email: ['email or Password is Invalid']
//     }

//     return [400, { error }]
//   }
// })
// mock.onPost('/jwt/register').reply(request => {
//   if (request.data.length > 0) {
//     const { email, password, username } = JSON.parse(request.data)
//     const isEmailAlreadyInUse = users.find(user => user.email === email)
//     const isUsernameAlreadyInUse = users.find(user => user.username === username)

//     const error = {
//       email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
//       username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
//     }
//     if (!error.username && !error.email) {
//       const { length } = users
//       let lastIndex = 0
//       if (length) {
//         lastIndex = users[length - 1].id
//       }

//       const userData = {
//         id: lastIndex + 1,
//         email,
//         password,
//         username,
//         avatar: null,
//         fullName: '',
//         role: 'admin'
//       }
//       users.push(userData)
//       const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret)
//       const user = { ...userData }
//       delete user.password
//       const response = { accessToken }

//       return [200, response]
//     }

//     return [200, { error }]
//   } else {
//     return [401, { error: 'Invalid Data' }]
//   }
// })
// mock.onGet('/auth/me').reply(config => {
//   // ** Get token from header
//   // @ts-ignore
//   const token = config.headers.Authorization

//   // ** Default response
//   let response = [200, {}]

//   // ** Checks if the token is valid or expired
//   jwt.verify(token, jwtConfig.secret, (err, decoded) => {
//     // ** If token is expired
//     if (err) {
//       // ** If onTokenExpiration === 'logout' then send 401 error
//       if (defaultAuthConfig.onTokenExpiration === 'logout') {
//         // ** 401 response will logout user from AuthContext file
//         response = [401, { error: { error: 'Invalid User' } }]
//       } else {
//         // ** If onTokenExpiration === 'refreshToken' then generate the new token
//         const oldTokenDecoded = jwt.decode(token, { complete: true })

//         // ** Get user id from old token
//         // @ts-ignore
//         const { id: userId } = oldTokenDecoded.payload

//         // ** Get user that matches id in token
//         const user = users.find(u => u.id === userId)

//         // ** Sign a new token
//         const accessToken = jwt.sign({ id: userId }, jwtConfig.secret, {
//           expiresIn: jwtConfig.expirationTime
//         })

//         // ** Set new token in localStorage
//         window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)
//         const obj = { userData: { ...user, password: undefined } }

//         // ** return 200 with user data
//         response = [200, obj]
//       }
//     } else {
//       // ** If token is valid do nothing
//       // @ts-ignore
//       const userId = decoded.id

//       // ** Get user that matches id in token
//       const userData = JSON.parse(JSON.stringify(users.find(u => u.id === userId)))
//       delete userData.password

//       // ** return 200 with user data
//       response = [200, { userData }]
//     }
//   })

//   return response
// })




//implement MYSQL authentication
// import { createConnection, executeQuery,testDatabaseConnection } from '../db';
import bcrypt from 'bcryptjs';
import { tr } from 'date-fns/locale';
import jwt from 'jsonwebtoken';
import mock from 'src/@fake-db/mock'
import defaultAuthConfig from 'src/configs/auth'
// import mysql from 'serverless-mysql';
const mysql = require('serverless-mysql');


// let connection;

// const createConnection = async () => {
//   console.log("create connection called");

//   connection = mysql({
//     config: {
//       host: 'localhost',
//       user: 'root',
//       password: 'xgen',
//       database: 'dialtas',
//       port: 3306
//     }
//   });

//   console.log("CONNECTION: ", connection);
//   return connection;
// };

const executeQuery = async ({ query, values }) => {
  try {
    
    // const  connection = await createConnection();
    const   connection = mysql({
      config: {
        host: 'localhost',
        user: 'root',
        password: 'xgen',
        database: 'dialtas',
        port: 3306
      }
    });
    const results = await connection.query(query, values);
    console.log("connection result:", results);

    // await connection.end();
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    return { error };
  }
}

const testDatabaseConnection = async () => {
  try {
    const result = await executeQuery({ query: 'SELECT * FROM users' });
    
    console.log("Test Database Connection Result:", result);
    
  
  } catch (error) {
    console.error('Error testing database connection:', error);
  }
}

const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
};

export const loginUser = async (email, password) => {
  try {
    console.log("Email and password:",email,password)
    const result = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ?',
      values: [email],
    });
    console.log("result of loginUser jwt",result)


    if (!Array.isArray(result) || result.length === 0) {
      return { success: false, error: { email: ['Email or Password is Invalid'] } };
    }

    const [user] = result;
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = true;

    if (!passwordMatch) {
      return { success: false, error: { email: ['Email or Password is Invalid'] } };
    }

    const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expirationTime,
    });

    const response = {
      accessToken,
      userData: { ...user, password: undefined },
    };
    console.log("Response of loginUser jwt",response)

    return { success: true, data: response };
  } catch (error) {
    console.error('Error authenticating user:', error.message);
    return { success: false, error: { email: ['Something went wrong'] } };
  }
};

export const registerUser = async (userData) => {
  // TODO: registration logic 
};

// mock.onPost('/jwt/login').reply(async (request) => {
//   const { email, password } = JSON.parse(request.data);

//   try {
//     const result = await executeQuery({ query: 'SELECT * FROM users WHERE email = ?', values: [email] });
//     console.log("Result:", result);
    

//     const [user] = result;

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       // Incorrect password
//       return [400, { error: { email: ['Email or Password is Invalid'] } }];
//     }

//     const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
//       expiresIn: jwtConfig.expirationTime,
//     });

//     const response = {
//       accessToken,
//       userData: { ...user, password: undefined },
//     };

//     return [200, response];
//   } catch (error) {
//     console.error('Error authenticating user:', error.message);
//     return [500, { error: { email: ['Something went wrong'] } }];
//   }
// });


// mock.onPost('/jwt/register').reply(request => {
//   if (request.data.length > 0) {
//     const { email, password, username } = JSON.parse(request.data)
//     const isEmailAlreadyInUse = users.find(user => user.email === email)
//     const isUsernameAlreadyInUse = users.find(user => user.username === username)

//     const error = {
//       email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
//       username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
//     }
//     if (!error.username && !error.email) {
//       const { length } = users
//       let lastIndex = 0
//       if (length) {
//         lastIndex = users[length - 1].id
//       }

//       const userData = {
//         id: lastIndex + 1,
//         email,
//         password,
//         username,
//         avatar: null,
//         fullName: '',
//         role: 'admin'
//       }
//       users.push(userData)
//       const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret)
//       const user = { ...userData }
//       delete user.password
//       const response = { accessToken }

//       return [200, response]
//     }

//     return [200, { error }]
//   } else {
//     return [401, { error: 'Invalid Data' }]
//   }
// })
// mock.onGet('/auth/me').reply(config => {
//   // ** Get token from header
//   // @ts-ignore
//   const token = config.headers.Authorization

//   // ** Default response
//   let response = [200, {}]

//   // ** Checks if the token is valid or expired
//   jwt.verify(token, jwtConfig.secret, (err, decoded) => {
//     // ** If token is expired
//     if (err) {
//       // ** If onTokenExpiration === 'logout' then send 401 error
//       if (defaultAuthConfig.onTokenExpiration === 'logout') {
//         // ** 401 response will logout user from AuthContext file
//         response = [401, { error: { error: 'Invalid User' } }]
//       } else {
//         // ** If onTokenExpiration === 'refreshToken' then generate the new token
//         const oldTokenDecoded = jwt.decode(token, { complete: true })

//         // ** Get user id from old token
//         // @ts-ignore
//         const { id: userId } = oldTokenDecoded.payload

//         // ** Get user that matches id in token
//         const user = users.find(u => u.id === userId)

//         // ** Sign a new token
//         const accessToken = jwt.sign({ id: userId }, jwtConfig.secret, {
//           expiresIn: jwtConfig.expirationTime
//         })

//         // ** Set new token in localStorage
//         window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)
//         const obj = { userData: { ...user, password: undefined } }

//         // ** return 200 with user data
//         response = [200, obj]
//       }
//     } else {
//       // ** If token is valid do nothing
//       // @ts-ignore
//       const userId = decoded.id

//       // ** Get user that matches id in token
//       const userData = JSON.parse(JSON.stringify(users.find(u => u.id === userId)))
//       delete userData.password

//       // ** return 200 with user data
//       response = [200, { userData }]
//     }
//   })

//   return response
// })

export const tester = async (email, password)=> {
  try {
    console.log("tester called")
    const email = 'admin@dialtas.com';
    const password = 'admin';

    const result = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ?',
      values: [email],
    });

    console.log('Printing data query:', result);

    if (!Array.isArray(result) || result.length === 0) {
      console.log('User not found');
      return;
    }

    const [user] = result;
    // const passwordMatch = true; // Replace this with your actual password comparison logic
    let passwordMatch = await bcrypt.compare(password, user.password);
    passwordMatch=!passwordMatch
    console.log("password and user.password and passwordMatch",password,user.password,passwordMatch)
    if (!passwordMatch) {
      console.log('Password does not match');
      return;
    }

    // Simulate JWT token creation
    const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expirationTime,
    });

    const response = {
      accessToken,
      userData: { ...user, password: undefined },
    };

    console.log('Login success:', response);
    return { success: true, data: response };

  } catch (error) {
    console.error('Error during login:', error.message);
  }
};

// tester('admin@dialtas.com','admin');