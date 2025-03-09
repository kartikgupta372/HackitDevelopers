// Open login modal
function openLoginModal() {
    document.getElementById("login-modal").style.display = "block";
}

// Close login modal
function closeLoginModal() {
    document.getElementById("login-modal").style.display = "none";
}

// Handle login form submission
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault(); 

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email === "test@example.com" && password === "password123") {
            alert("Login successful!");
            closeLoginModal();
        } else {
            document.getElementById("login-error").innerText = "Invalid credentials.";
        }
    });
});
