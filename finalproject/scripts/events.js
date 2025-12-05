document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events");

    fetch("data/events.json")
        .then(response => response.json())
        .then(data => {
            const events = data.events;

            events.forEach(event => {
                const card = document.createElement("div");
                card.classList.add("event-card");

                card.innerHTML = `
                    <img src="${event.image}" alt="${event.name}" class="event-image">
                    <div class="event-info">
                        <h4>${event.name}</h4>
                        <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
                        <p>${event.description}</p>
                    </div>
                `;

                eventsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading events:", error));
});
