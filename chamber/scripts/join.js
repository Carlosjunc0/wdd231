// Set timestamp value when page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("timestamp").value = new Date().toISOString();
});

// ===== MODAL LOGIC =====
const modalButtons = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

modalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById(btn.dataset.modal).style.display = "block";
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal").style.display = "none";
    });
});

// Close modal when clicking outside
window.addEventListener("click", e => {
    modals.forEach(modal => {
        if (e.target === modal) modal.style.display = "none";
    });
});
 