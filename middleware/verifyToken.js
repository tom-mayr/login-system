const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.userId = decoded.id;
        next(); // Move to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = verifyToken;
