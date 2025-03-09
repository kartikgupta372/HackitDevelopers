document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful! Please log in.");
                closeSignup();
                openLogin();
            } else {
                alert(data.msg || "Signup failed");
            }
        } catch (error) {
            console.error("Signup Error:", error);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signup-btn").addEventListener("click", function () {
        window.location.href = "signup.html"; // Redirect to SignUp Page
    });
});

