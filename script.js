// Map of field IDs to validation messages
const errorMessages = {
  username: "Field required",
  email: "Enter a valid email",
  password: "Field required",
  confirmPassword: "Passwords must match"
};

// Validate individual input
function validateField(input) {
  const id = input.id;
  const value = input.value.trim();
  let valid = true;

  // Base validation
  if (value === "") {
    valid = false;
  }

  // Email validation
  if (id === "email" && value !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      valid = false;
    }
  }

  // Password match
  if (id === "confirmPassword" && value !== "") {
    const passwordVal = document.getElementById("password").value.trim();
    if (value !== passwordVal || passwordVal === "") {
      valid = false;
    }
  }

  if (!valid) {
    input.classList.add("invalid");
    input.dataset.originalPlaceholder = input.placeholder;
    input.value = "";
    input.placeholder = errorMessages[id] || "Invalid input";
    input.style.color = "#888";
  } else {
    input.classList.remove("invalid");
    input.style.color = ""; // reset to default
  }

  return valid;
}

// Clear error tip when focusing input
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("focus", () => {
    if (input.classList.contains("invalid")) {
      input.placeholder = input.dataset.originalPlaceholder || "";
      input.style.color = ""; // reset color
    }
  });

  input.addEventListener("blur", () => validateField(input));
});

// Validate on form submission
document.getElementById("signupForm").addEventListener("submit", function (e) {
  const fieldIds = ["username", "email", "password", "confirmPassword"];
  let allValid = true;

  fieldIds.forEach(id => {
    const input = document.getElementById(id);
    const valid = validateField(input);
    if (!valid) {
      allValid = false;
    }
  });

  if (!allValid) {
    e.preventDefault(); // stop submission if invalid
  }
});
