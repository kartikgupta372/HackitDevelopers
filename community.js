document.addEventListener("DOMContentLoaded", function () {
    const apiBaseUrl = "http://localhost:3000/api/posts"; // Backend API URL

    // ✅ Redirect to Home page
    document.getElementById("home-link").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "index.html";
    });

    // ✅ Redirect to Community page
    document.getElementById("community-link").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "community.html";
    });

    // ✅ Redirect to AI Chat page
    document.getElementById("chat-link").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "chat.html";
    });

    // Function to load posts from backend API
    async function loadCommunityPosts() {
        try {
            const response = await fetch(apiBaseUrl);
            const posts = await response.json();

            const postsContainer = document.getElementById("community-posts");
            postsContainer.innerHTML = ""; // Clear existing posts

            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("post-card");
                postElement.innerHTML = `
                    <div class="post-header">
                        <h2 class="author-name">${post.username}</h2>
                        <p class="post-content">${post.content}</p>
                        <button class="delete-btn" data-id="${post.id}">Delete</button>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });

            // Attach delete event listeners
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", async function () {
                    let postId = this.getAttribute("data-id");
                    await deletePost(postId);
                });
            });

        } catch (error) {
            console.error("Error loading posts:", error);
        }
    }

    // Function to submit a new post via API
    document.getElementById("post-submit").addEventListener("click", async function () {
        const username = document.getElementById("username").value;
        const content = document.getElementById("content").value;

        if (!username || !content) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch(apiBaseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, content })
            });

            if (response.ok) {
                document.getElementById("username").value = "";
                document.getElementById("content").value = "";
                loadCommunityPosts(); // Refresh posts after adding
            } else {
                console.error("Failed to add post");
            }
        } catch (error) {
            console.error("Error adding post:", error);
        }
    });

    // Function to delete a post via API
    async function deletePost(postId) {
        try {
            const response = await fetch(`${apiBaseUrl}/${postId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                loadCommunityPosts(); // Refresh posts after deleting
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    // Load posts on page load
    if (document.getElementById("community-posts")) {
        loadCommunityPosts();
    }
});
