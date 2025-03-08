const express = require("express");
const mysql = require("mysql2");
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

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,  // Your MySQL Server (localhost or IP)
    user: process.env.DB_USER,  // Your MySQL username
    password: process.env.DB_PASS, // Your MySQL password
    database: process.env.DB_NAME, // Database name
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("✅ MySQL Connected!");
    }
});

// ✅ Create Database Table (Run Once)
db.query(
    `CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255),
        content TEXT
    )`,
    (err) => {
        if (err) console.error("Table creation error:", err);
    }
);

// ✅ Home Route
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// ✅ Show All Posts
app.get("/posts", (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) return res.status(500).send("Database Error");
        res.render("index.ejs", { posts: results });
    });
});

// ✅ Show Form to Create Post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
const userRoutes = require("./userRoute");
app.use("/api", userRoutes); // Base route for users


// ✅ Create New Post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();

    db.query(
        "INSERT INTO posts (id, username, content) VALUES (?, ?, ?)",
        [id, username, content],
        (err) => {
            if (err) return res.status(500).send("Error inserting post");
            res.redirect("/posts");
        }
    );
});

// ✅ Show Single Post
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Post not found");
        res.render("show.ejs", { post: results[0] });
    });
});

// ✅ Edit Post Form
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Post not found");
        res.render("edit.ejs", { post: results[0] });
    });
});

// ✅ Update Post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    db.query("UPDATE posts SET content = ? WHERE id = ?", [content, id], (err) => {
        if (err) return res.status(500).send("Error updating post");
        res.redirect("/posts");
    });
});

// ✅ Delete Post
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send("Error deleting post");
        res.redirect("/posts");
    });
});
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to NutriMom API!");
});
module.exports = app;
