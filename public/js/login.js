// Prompt the user to enter their username and password.
// Upon successful sign-in, show navigation links for homepage, dashboard, and logout.
// logged in users can leave comments under the blog post

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log("Username", username);
  console.log("Password:", password);

  if (username && password) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // redirect to the dashboard page after signing in
        document.location.replace("/dashboard");
      } else {
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while logging in. Please try again.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
