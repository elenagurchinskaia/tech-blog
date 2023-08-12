const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log("Email:", email);
  console.log("Password:", password);

  if (email && password) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace("/profile");
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
