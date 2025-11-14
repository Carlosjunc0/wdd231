document.addEventListener("DOMContentLoaded", () => {
    loadSpotlights();
});

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Error loading members JSON");
        }

        const data = await response.json();
        const members = data.members;

        // Filter: only Gold (3) or Silver (2)
        const eligible = members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);

        if (eligible.length === 0) {
            console.warn("No Gold or Silver members found.");
            return;
        }

        // Randomize
        const shuffled = eligible.sort(() => 0.5 - Math.random());

        // Select 2 or 3
        const spotlightCount = Math.min(3, Math.max(2, shuffled.length));
        const selected = shuffled.slice(0, spotlightCount);

        const container = document.getElementById("spotlightContainer");
        container.innerHTML = ""; // Clean before loading

        selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            const levelLabel = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p><strong>${levelLabel}</strong></p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
    }
}
