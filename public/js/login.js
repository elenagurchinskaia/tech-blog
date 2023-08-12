const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

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

// const signupFormHandler = async (event) => {
//   event.preventDefault();
//   console.log(event);
//   const name = document.querySelector("#username-signup").value.trim();
//   const email = document.querySelector("#email-signup").value.trim();
//   const password = document.querySelector("#password-signup").value.trim();
//   console.log(name, email, password);
//   if (name && email && password) {
//     const response = await fetch("/api/users", {
//       // not responding to userRoutes
//       method: "POST",
//       body: JSON.stringify({ name, email, password }),
//       headers: { "Content-Type": "application/json" },
//     });
//     console.log(response.ok);
//     if (response.ok) {
//       document.location.replace("/");
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

// document
//   .querySelector(".signup-form")
//   .addEventListener("submit", signupFormHandler);
