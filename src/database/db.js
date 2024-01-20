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
