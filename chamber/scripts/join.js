// Timestamp
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("timestamp").value = new Date().toISOString();
});

// OPEN MODAL BUTTONS
const openButtons = document.querySelectorAll(".openModal");
openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const dialog = document.getElementById(btn.dataset.target);
        dialog.showModal();
    });
});

// CLOSE MODAL BUTTONS
const closeButtons = document.querySelectorAll(".closeModal");
closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});

// CLOSE DIALOG CLICKING OUTSIDE // Aditional Improvement
document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top || e.clientY > rect.bottom) {
            dialog.close();
        }
    });
});
