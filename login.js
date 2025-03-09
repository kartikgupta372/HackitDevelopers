// Open Login page
function openLogin() {
    window.location.href = "LogInHtml.html";
}

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            };

            try {
                const response = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (data.success) {
                    alert("Login Successful!");
                    window.location.href = "index.html"; // Redirect to home
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
});
