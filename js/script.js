//! this logics for user-details div (menubar)
const userToggle = document.getElementById("userToggle");
const userDetails = document.querySelector(".user-details");

// Toggle visibility of user panel
userToggle.addEventListener("click", (e) => {
  e.preventDefault();
  userDetails.classList.toggle("active");
});

// Close panel when clicking outside
document.addEventListener("click", (e) => {
  if (!userDetails.contains(e.target)) {
    userDetails.classList.remove("active");
  }
});


//! === Sidebar Toggle ===
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.menu-bar');
const mainContent = document.querySelector('.main-content');

hamburger.addEventListener('click', () => {
  // Desktop behavior
  if (window.innerWidth > 992) {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
  } else {
    // Mobile / tablet behavior
    sidebar.classList.toggle('active');
    document.body.classList.toggle('overlay');
  }
});

// Optional: click outside sidebar to close on mobile
document.addEventListener('click', (e) => {
  if (
    window.innerWidth <= 992 &&
    sidebar.classList.contains('active') &&
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    sidebar.classList.remove('active');
    document.body.classList.remove('overlay');
  }
});
