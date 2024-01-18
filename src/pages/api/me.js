// src/pages/api/me.js
import jwt from 'jsonwebtoken';
const mysql = require('serverless-mysql');

const executeQuery = async ({ query, values }) => {
    try {
        const connection = mysql({
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

        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        return { error };
    }
}

const jwtConfig = {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
};

export default async function handler(req, res) {
    const token = req.headers.authorization;
    if (!token) {
        // Token is missing
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        const userId = decoded.id;

        const result = await executeQuery({
            query: 'SELECT * FROM users WHERE id = ?',
            values: [userId],
        });

        const [user] = result;

        if (!user) {
            return res.status(401).json({ error: { error: 'Invalid User' } });
        }

        const userData = { ...user };
        delete userData.password;

        return res.status(200).json({ userData });
    } catch (error) {
        return res.status(401).json({ error: { error: 'Invalid User' } });
    }
    
}
