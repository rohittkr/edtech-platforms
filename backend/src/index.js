const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");

// Middleware Setup
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("✅ EdTech Backend is Running 🚀");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Uncaught Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
