document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('✅ Login successful');
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html'; // Redirect after login
        } else {
            alert(data.msg || '❌ Login failed');
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
});

document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('✅ Signup successful');
            window.location.href = 'login.html'; // Redirect after signup
        } else {
            alert(data.msg || '❌ Signup failed');
        }
    } catch (error) {
        console.error('Signup Error:', error);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Logged in successfully!");  // Add actual login logic
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Account created successfully!");  // Add actual signup logic
        });
    }
});
