document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    document.getElementById("login-btn").addEventListener("click", function () {
        window.location.href = "login.html"; // Redirect to Login Page
    });

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful");
                closeLogin();
                window.location.href = "community.html"; // Redirect to community
            } else {
                alert(data.msg || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    });
});
