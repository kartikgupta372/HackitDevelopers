const BASE_URL = "http://localhost:3000/api"; // Backend API base URL

document.getElementById("kycForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(this); // Get form data

    // ✅ Validate if KYC Document is uploaded
    if (!formData.get("kycDocument").name) {
        alert("❌ Please upload a KYC document!");
        return;
    }

    try {
        // ✅ Send KYC data to backend
        const response = await fetch(`${BASE_URL}/kyc`, {
            method: "POST",
            body: formData, // Sending as FormData for file upload
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ KYC Submitted Successfully!");
            window.location.href = "dashboard.html"; // Redirect after successful KYC
        } else {
            alert(data.message || "❌ KYC Submission Failed!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ An error occurred. Please try again.");
    }
});
