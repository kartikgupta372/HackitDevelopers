const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to NutriMom API!');
});

module.exports = app;
function redirectToLogin() {
    window.location.href = "login.html";  // Redirects to login page
}

function redirectToSignUp() {
    window.location.href = "signup.html";  // Redirects to signup page
}document.getElementById("aiChatBtn").addEventListener("click", async function () {
    // Example user data (Modify as needed)
    const userData = {
        age: 25,
        pregnancy_month: 6,
        diet_type: "Veg",
        symptoms: "Fatigue, Nausea",
        weight_category: "Normal"
    };

    try {
        const response = await fetch("https://https://hackitdevelopers-1.onrender.com/get_recommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        // Display the AI response in a modal or chat window
        document.getElementById("aiChatResponse").innerText = data.recommendation;
    } catch (error) {
        console.error("Error fetching AI recommendation:", error);
    }
});

