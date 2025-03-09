
document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", async function () {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        displayMessage("You", userMessage);
        chatInput.value = "";

        try {
            const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            if (response.ok) {
                displayMessage("NutriMom AI", data.reply);
            } else {
                displayMessage("NutriMom AI", "Something went wrong. Try again.");
            }
        } catch (error) {
            console.error("Chat Error:", error);
            displayMessage("NutriMom AI", "Error connecting to AI.");
        }
    });

    function displayMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
