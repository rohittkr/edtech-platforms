const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "your-secret-key";

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
