const form = document.getElementById("registerForm");
const message = document.getElementById("message");

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const currentBtn = document.getElementById("currentBtn");
const currentResult = document.getElementById("currentResult");

if (form) {
  form.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(form);

    const userData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      age: Number(formData.get("age")),
      password: formData.get("password")
    };

    try {
      const response = await fetch("/api/sessions/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        message.className = "message success";
        message.innerHTML = `
          <strong>User created successfully.</strong><br>
          Name: ${result.user.first_name} ${result.user.last_name}<br>
          Email: ${result.user.email}<br>
          Role: ${result.user.role}
        `;

        form.reset();
      } else {
        message.className = "message error";
        message.textContent = result.message || "User could not be created";
      }
    } catch (error) {
      message.className = "message error";
      message.textContent = "Server connection error";
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await fetch("/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (response.ok) {
        loginMessage.className = "message success";
        loginMessage.innerHTML = `
          <strong>Login successful.</strong><br>
          JWT cookie was saved correctly.
        `;

        loginForm.reset();
      } else {
        loginMessage.className = "message error";
        loginMessage.textContent = result.message || "Login failed";
      }
    } catch (error) {
      loginMessage.className = "message error";
      loginMessage.textContent = "Server connection error";
    }
  });
}

if (currentBtn) {
  currentBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/sessions/current", {
        method: "GET",
        credentials: "include"
      });

      if (response.ok) {
        const result = await response.json();
        currentResult.textContent = JSON.stringify(result, null, 2);
      } else {
        currentResult.textContent = "You must log in first.";
      }
    } catch (error) {
      currentResult.textContent = "You must log in first";
    }
  });
}