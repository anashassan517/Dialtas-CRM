// pages/api/login.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import executeQuery from 'src/database/executeQuery';

const jwtConfig = {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
};

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    try {
        const result = await executeQuery({
            query: 'SELECT * FROM users WHERE email = ?',
            values: [email],
        });

        const [user] = result;

        if (!user) {
            return res.status(400).json({ error: { email: ['Email or Password is Invalid'] } });
        }
        // const newPassword=await bcrypt.hash(password)
        // const passwordMatch = await bcrypt.compare(password, user.password); // Fix this line
        const passwordMatch =true; // Fix this line

        if (!passwordMatch || (password!==user.password)) {
            return res.status(400).json({ error: { email: ['Email or Password is Invalid'] } });
        }

        const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
            expiresIn: jwtConfig.expirationTime,
        });

        const response = {
            accessToken,
            userData: { ...user, password: undefined },
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        return res.status(500).json({ error: { email: ['Something went wrong'] } });
    }
}
