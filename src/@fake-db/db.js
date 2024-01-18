



// import mysql from 'serverless-mysql';
// const executeQuery = async ({ query, values }) => {
//   try {
//     console.log("Execute query called on DB")
//       const connection = mysql({
//           config: {
//               host: 'localhost',
//               user: 'root',
//               password: 'xgen',
//               database: 'dialtas',
//               port: 3306
//           }
//       });
//       const results = await connection.query(query, values);
//       console.log("connection result:", results);

//       return results;
//   } catch (error) {
//       console.error('Error executing query:', error);
//       return { error };
//   }
// }

// const testDatabaseConnection = async () => {
//   try {
//     const result = await executeQuery({ query: 'SELECT * FROM users' });
    
//     console.log("Test Database Connection Result:", result);
    
  
//   } catch (error) {
//     console.error('Error testing database connection:', error);
//   }
// }

// // testDatabaseConnection();

// module.exports = { testDatabaseConnection,createConnection,executeQuery };



// db.js
const mysql = require('serverless-mysql');

const db = mysql({
  config: {
    host: 'localhost',
    user: 'root',
    password: 'xgen',
    database: 'dialtas',
    port: 3306,
  },
});

module.exports = db;
