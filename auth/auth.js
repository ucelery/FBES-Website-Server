const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Function to generate JWT
function generateToken(user) {
    return jwt.sign({ user }, secretKey, { expiresIn: '1h' });
}

// Function to verify JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        console.log(token);
        console.log(secretKey);
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = { verifyToken, generateToken }