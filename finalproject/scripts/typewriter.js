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


// Open modal button
const openButtons = document.querySelectorAll(".openModal");
openButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const dialog = document.getElementById(btn.dataset.target);
    dialog.showModal();
  });
});

// Close modal button
const closeButtons = document.querySelectorAll(".closeModal");
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});

// Close dialog clicking outside
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom) {
      dialog.close();
    }
  });
});

// FAQ section
const items = document.querySelectorAll('.faq-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});