import { courses } from "./courses.js";

document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.querySelector(".bottom");
    const creditDisplay = document.querySelector(".credits");
    const buttons = document.querySelectorAll(".course-box1");

    function displayCourses(filteredCourses) {
        courseContainer.innerHTML = ""; // Clear previous courses

        filteredCourses.forEach((course) => {
            const card = document.createElement("div");
            card.classList.add("course-box2");
            // Change color based on completion
            if (course.completed) {
                card.classList.add("completed");
            }

            card.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
      `;

            courseContainer.appendChild(card);
        });

        // Sum credits
        const totalCredits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
        creditDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
    }

    function filterCourses(type) {
        const upperType = type.toUpperCase();
        if (upperType === "ALL") return courses;
        return courses.filter((c) => c.subject === upperType);
    }

    // Listeners buttons
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const type = btn.textContent.trim();
            const filtered = filterCourses(type);
            displayCourses(filtered);
            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Show all courses on load
    displayCourses(courses);
});
