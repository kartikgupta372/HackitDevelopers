// Open signup modal
function openSignupModal() {
    document.getElementById("signup-modal").style.display = "block";
}

// Close signup modal
function closeSignupModal() {
    document.getElementById("signup-modal").style.display = "none";
}

// Handle signup form submission
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signup-form").addEventListener("submit", function (e) {
        e.preventDefault(); 

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (name && email && password) {
            alert("Signup successful!");
            closeSignupModal();
        } else {
            document.getElementById("signup-error").innerText = "Please fill all fields.";
        }
    });
});
