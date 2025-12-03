// hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburgerIcon && navMenu) {
        hamburgerIcon.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            body.classList.toggle('mobile-menu-active');

            // Change hamburger icon to X when active
            if (navMenu.classList.contains('active')) {
                hamburgerIcon.src = '../images/x-icon.svg';
            } else {
                hamburgerIcon.src = 'images/hamburger-button-icon.svg';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                body.classList.remove('mobile-menu-active');
                hamburgerIcon.src = 'images/hamburger-button-icon.svg';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.nav-bar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.classList.remove('mobile-menu-active');
                hamburgerIcon.src = 'images/hamburger-button-icon.svg';
            }
        });
    }
});

// Typewriter effect
const text = "Welcome to my website!";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typeWriter").textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100); 
    } else {
      document.getElementById("typeWriter").style.borderRight = "none";
    }
  }

  typeWriter();

// footer date update
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;