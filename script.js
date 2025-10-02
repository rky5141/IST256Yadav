// script.js

function validateField(input) {
  const id = input.id;
  const value = input.value.trim();

  // Reset state
  input.classList.remove("is-invalid");
  input.classList.remove("is-valid");

  let valid = true;

  // Required field check
  if (value === "") {
    valid = false;
  }

  // Special-case email format
  if (id === "email" && value !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      valid = false;
    }
  }

  // Confirm password: must match password
  if (id === "confirmPassword" && value !== "") {
    const passVal = document.getElementById("password").value.trim();
    if (value !== passVal || passVal === "") {
      valid = false;
    }
  }

  // Apply classes
  if (!valid) {
    input.classList.add("is-invalid");
  } else {
    input.classList.add("is-valid");
  }

  return valid;
}

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fieldIds = ["username", "email", "password", "confirmPassword"];
  let allValid = true;

  fieldIds.forEach(id => {
    const fld = document.getElementById(id);
    const ok = validateField(fld);
    if (!ok) {
      allValid = false;
    }
  });

  if (allValid) {
    // All good → proceed (you may send data, redirect, etc.)
    alert("Sign-up form is valid! You can now submit to server.");
    // Optionally reset:
    // this.reset();
    // Clear validation classes
    fieldIds.forEach(id => {
      const fld = document.getElementById(id);
      fld.classList.remove("is-valid");
    });
  } else {
    alert("Please fix the errors highlighted in red before submitting.");
  }
});
