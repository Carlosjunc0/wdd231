// Navigation menu toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.querySelector(".Hamburger-icon");
  const navMenu = document.querySelector("#nav-menu");

  const hamburgerImg = "images/Hamburger-button-icon.svg";
  const closeImg = "images/x-icon.svg";

  hamburgerIcon.addEventListener("click", () => {
    // change menu visibility
    navMenu.classList.toggle("active");

    // change icon based on menu state
    if (navMenu.classList.contains("active")) {
      hamburgerIcon.src = closeImg;
    } else {
      hamburgerIcon.src = hamburgerImg;
    }
  });
});

// Set current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;