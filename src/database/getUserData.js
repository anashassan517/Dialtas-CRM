// getUserData.js
const jwt = require('jsonwebtoken');
const executeQuery=require('./executeQuery');

const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
};

const getUserData = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
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
};

module.exports = getUserData;
