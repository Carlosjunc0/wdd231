import { courses } from "./courses.js";

document.addEventListener("DOMContentLoaded", () => {
  const courseContainer = document.querySelector(".bottom");
  const creditDisplay = document.querySelector(".credits");
  const buttons = document.querySelectorAll(".course-box1");

  function displayCourses(filteredCourses) {
    courseContainer.innerHTML = ""; // Limpiar contenedor

    filteredCourses.forEach((course) => {
      const card = document.createElement("div");
      card.classList.add("course-box2");
      if (course.completed) card.classList.add("completed");

      card.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
      `;
      courseContainer.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce(
      (sum, c) => sum + c.credits,
      0
    );
    creditDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
  }

  // Filtros
  function filterCourses(type) {
    if (type === "All") return courses;
    return courses.filter((c) => c.subject === type);
  }

  // Event listeners para botones
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.textContent.trim();
      const filtered = filterCourses(type);
      displayCourses(filtered);
    });
  });

  // Mostrar todos al inicio
  displayCourses(courses);
});
