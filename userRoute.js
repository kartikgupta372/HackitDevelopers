const express = require("express");
const router = express.Router();
const db = require("./db"); // Use this for files in the same folder

// ✅ Fetch All Users (with error handling)
router.get("/users", async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM users");
        res.json(users);
    } catch (err) {
        console.error("❌ Database Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Add a New User (with duplicate email check)
router.post("/users", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        await db.query(query, [name, email, password]);
        res.status(201).json({ message: "✅ User added successfully!" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            res.status(400).json({ error: "❌ Email already exists" });
        } else {
            console.error("❌ Error inserting user:", err.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
module.exports = router;
