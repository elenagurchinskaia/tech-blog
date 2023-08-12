const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log(event);

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log(username, password);

  if (username && password) {
    try {
      // send a POST req to the api endpoint
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.ok);
      if (response.ok) {
        // redirect to the dashboard page after signing up
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while signing up. Please try again.");
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
