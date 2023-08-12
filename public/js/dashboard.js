// Display user's existing blog posts.
// Option to add a new blog post.
// Clicking on existing posts allows updating or deleting posts.
// Prompt user to enter a title and contents for the new post.
// Clicking on create button saves the new post and updates the dashboard.
// Users can update or delete their existing posts.
// Dashboard updates after performing actions.
// Clicking on logout option signs the user out.
// Implement a mechanism that prompts users to log in again after being idle for a set time.

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#blog-name").value.trim();

  const description = document.querySelector("#blog-desc").value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create project");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".blog-list")
  .addEventListener("click", delButtonHandler);
