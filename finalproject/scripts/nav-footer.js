// hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-icon');
    const nav = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            nav.classList.toggle('active');
            

            if (nav.classList.contains('active')) {
                hamburger.innerHTML = '✕'; 
                hamburger.classList.add('close');
                body.classList.add('menu-open');
            } else {
                hamburger.innerHTML = '☰';
                hamburger.classList.remove('close');
                body.classList.remove('menu-open');
            }
        });

        // close menu clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.innerHTML = '☰';
                hamburger.classList.remove('close');
                body.classList.remove('menu-open');
            });
        });

        // close menu clicking out nav
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !hamburger.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.innerHTML = '☰';
                hamburger.classList.remove('close');
                body.classList.remove('menu-open');
            }
        });
    }
});

// footer date update
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;