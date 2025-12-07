document.addEventListener("DOMContentLoaded", () => {
    // Get current date
    const now = new Date();

    // set date
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    // set hours and minutes
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // this is how will be display
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    document.getElementById("timestamp").value = formattedDate;
});