const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// ✅ MySQL Database Connection (Using async/await)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// ✅ Home Route
app.get("/", (req, res) => {
    res.send("Welcome to NutriMom API!");
});

// ✅ Routes
const userRoutes = require("./backend/routes/userRoutes");
const authRoutes = require("./backend/routes/authRoutes");

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Show All Posts
app.get("/posts", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM posts");
        res.render("index.ejs", { posts: results });
    } catch (err) {
        res.status(500).send("Database Error");
    }
});

// ✅ Create New Post
app.post("/posts", async (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();

    try {
        await db.query("INSERT INTO posts (id, username, content) VALUES (?, ?, ?)", [id, username, content]);
        res.redirect("/posts");
    } catch (err) {
        res.status(500).send("Error inserting post");
    }
});

// ✅ Show Single Post
app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
        if (results.length === 0) return res.status(404).send("Post not found");
        res.render("show.ejs", { post: results[0] });
    } catch (err) {
        res.status(500).send("Database Error");
    }
});

// ✅ Edit Post Form
app.get("/posts/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
        if (results.length === 0) return res.status(404).send("Post not found");
        res.render("edit.ejs", { post: results[0] });
    } catch (err) {
        res.status(500).send("Database Error");
    }
});

// ✅ Update Post
app.patch("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        await db.query("UPDATE posts SET content = ? WHERE id = ?", [content, id]);
        res.redirect("/posts");
    } catch (err) {
        res.status(500).send("Error updating post");
    }
});

// ✅ Delete Post
app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM posts WHERE id = ?", [id]);
        res.redirect("/posts");
    } catch (err) {
        res.status(500).send("Error deleting post");
    }
});

module.exports = app;


