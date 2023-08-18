// Display user's existing blog posts.
// Option to add a new blog post.
// Clicking on existing posts allows updating or deleting posts.
// Prompt user to enter a title and contents for the new post.
// Clicking on create button saves the new post and updates the dashboard.
// Users can update or delete their existing posts.
// Dashboard updates after performing actions.
// Clicking on logout option signs the user out.
// Implement a mechanism that prompts users to log in again after being idle for a set time.

// ------------------------------------- New Blog Button ------------------------------------- //

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#blog-name").value.trim();

  const description = document.querySelector("#blog-desc").value.trim();

  if (name && description) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
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

// ------------------------------------- Create a Blog Form ------------------------------------- //
// TODO: create a function to generate the form
const genForm = async (event) => {
  event.preventDefault();

  const formContainer = document.querySelector("#form-container");

  // create form element
  const form = document.createElement("form");
  form.id = "blog-form";
  formContainer.appendChild(form);

  // create input for blog name
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Blog Name:";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "blog-name";
  nameInput.required = true;
  form.appendChild(nameLabel);
  form.appendChild(nameInput);

  // create input for blog description
  const descLabel = document.createElement("label");
  descLabel.textContent = "Blog Description:";
  const descInput = document.createElement("textarea");
  descInput.id = "blog-desc-input";
  descInput.required = true;
  form.appendChild(descLabel);
  form.appendChild(descInput);

  // create submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Blog";
  form.appendChild(submitButton);

  // add event listener to prevent default form submission

  // document.querySelector("#new-post-button").addEventListener("click", genForm);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#blog-name").value.trim();
    const description = document.querySelector("#blog-desc-input").value.trim();

    if (name && description) {
      const response = await fetch(`/api/blogs`, {
        method: "POST",
        body: JSON.stringify({ name, description }),
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
  });
};

// ------------------------------------- Delete Blog Button ------------------------------------- //
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

document.querySelector("#new-post-button").addEventListener("click", genForm);

document
  .querySelector("#form-container")
  .addEventListener("submit", newFormHandler);
