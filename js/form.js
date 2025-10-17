document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("User added successfully!");
  window.location.href = "users.html"; // Redirect back to user list
});
