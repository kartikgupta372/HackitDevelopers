// Open Sign In page
function openSignin() {
    window.location.href = "SignUpCss.html";
}

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signin-form");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                age: document.getElementById("age").value,
                diet: document.getElementById("diet").value
            };

            try {
                const response = await fetch("http://localhost:3000/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (data.success) {
                    alert("Sign In Successful!");
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
