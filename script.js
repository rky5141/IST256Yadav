// script.js

// Function to validate individual fields
function validateField(input) {
  const id = input.id;
  const value = input.value.trim();

  // Reset state
  input.classList.remove("is-invalid");
  input.classList.remove("is-valid");

  let valid = true;

  // Check if field is empty (required)
  if (value === "") {
    valid = false;
  }

  // Special-case for email validation
  if (id === "email" && value !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      valid = false;
    }
  }

  // Confirm password: must match the password field
  if (id === "confirmPassword" && value !== "") {
    const passwordVal = document.getElementById("password").value.trim();
    if (value !== passwordVal || passwordVal === "") {
      valid = false;
    }
  }

  // Apply appropriate styles based on validity
  if (!valid) {
    input.classList.add("is-invalid");
  } else {
    input.classList.add("is-valid");
  }

  return valid;
}

// Event listener to validate fields when user leaves input field
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("focusout", function () {
    validateField(input);
  });
});

// Handle form submission and validate all fields
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from submitting

  const fieldIds = ["username", "email", "password", "confirmPassword"];
  let allValid = true;

  // Validate all fields
  fieldIds.forEach(id => {
    const fld = document.getElementById(id);
    const ok = validateField(fld);
    if (!ok) {
      allValid = false;
    }
  });

  // If all fields are valid, submit the form (you could also submit to a server here)
  if (allValid) {
    alert("Sign-up successful!");
    // Optionally, clear form fields here if needed:
    // this.reset();
    // Clear validation classes
    fieldIds.forEach(id => {
      const fld = document.getElementById(id);
      fld.classList.remove("is-valid");
    });
  } else {
    alert("Please correct the errors before submitting.");
  }
});
