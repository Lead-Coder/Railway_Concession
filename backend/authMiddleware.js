const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Replace with a secure key

// Middleware for token verification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (!token) {
        return res.status(401).send({ message: "Access Denied: No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log(decoded)
        next(); 
    } catch(err) {
        res.status(403).send({ message: "Invalid Token" });
    }
};

module.exports = authenticateToken;
