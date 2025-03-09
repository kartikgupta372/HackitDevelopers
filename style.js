const express = require("express.js");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS (Allows frontend to talk to backend)
app.use(cors());

// Serve the frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Route all frontend requests to `index.html`
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Redirect API calls to the backend
app.use("/api", (req, res) => {
    res.redirect("http://localhost:5000" + req.url);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
});
