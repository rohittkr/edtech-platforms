const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const secretKey = process.env.JWT_SECRET || "your-secret-key";

// User Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        console.log("🔹 Checking user in database:", email);

        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length === 0) {
                console.warn("⚠️ No user found with email:", email);
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const user = results[0];

            // Ensure the password field exists
            if (!user.password) {
                console.error("❌ User data corrupted: Missing password field");
                return res.status(500).json({ error: "User data corrupted" });
            }

            console.log("🔹 Verifying password...");
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                console.warn("⚠️ Incorrect password for:", email);
                return res.status(401).json({ error: "Invalid credentials" });
            }

            console.log("✅ Password verified. Generating JWT...");
            const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: "1h" });

            res.json({ message: "Login successful", token, role: user.role });
        });
    } catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Test Route
router.get("/", (req, res) => {
    res.json({ message: "Auth route is working!" });
});

module.exports = router;
