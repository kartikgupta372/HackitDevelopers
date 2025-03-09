const BASE_URL = "http://localhost:3000/api"; // Update with your actual backend URL

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = {};
    new FormData(this).forEach((value, key) => {
        formData[key] = value;
    });

    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Sign Up successful!");
            window.location.href = "dashboard.html"; // Redirect after successful signup
        } else {
            alert(data.message || "Sign Up failed");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});
