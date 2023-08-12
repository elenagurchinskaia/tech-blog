// display existing blog posts
// nav links for the homepage and the dashboard
// option to log in

// function to fetch and display existing blog posts
const getRecentPosts = async () => {
  try {
    const response = await fetch("/api/blog/recent", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const recentPosts = await response.json();
      const postContainer = document.querySelector(".post-container");

      recentPosts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        const title = document.createElement("h2");
        title.textContent = post.title;
        postDiv.appendChild(title);

        const content = document.createElement("p");
        content.textContent = post.content;
        postDiv.appendChild(content);

        const addCommentBtn = document.createElement("button");
        addCommentBtn.classList.add("add-comment-btn");
        addCommentBtn.setAttribute("data-post-id", post.id);
        addCommentBtn.textContent = "Add Comment";
        postDiv.appendChild(addCommentBtn);

        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");
        commentSection.setAttribute("data-post-id", post.id);
        postDiv.appendChild(commentSection);

        postContainer.appendChild(postDiv);
      });
    } else {
      console.error("Failed to fetch recent blog posts");
    }
  } catch (err) {
    console.error(err);
  }
};

// function to handle adding comments
const addComment = async (postId, commentText) => {
  try {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ blog_id: postId, text: commentText }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // reload the page to show the updated comments
      window.location.reload();
    } else {
      console.error("Failed to add comment");
    }
  } catch (err) {
    console.error(err);
  }
};

// event listener to add comments
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("add-comment-btn")) {
    const postId = event.target.getAttribute("data-post-id");
    const commentText = prompt("Enter your comment:");

    if (commentText) {
      addComment(postId, commentText);
    }
  }
});

// event listener load recent posts

document.addEventListener("DOMContentLoaded", () => {
  getRecentPosts();
});
