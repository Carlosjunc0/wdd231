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
  
const items = document.querySelectorAll('.faq-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});