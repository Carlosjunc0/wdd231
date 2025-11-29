import { huatulcoPlaces } from "../data/huatulco-places.mjs";

/* visit message */

const messageBox = document.querySelector("#visit-message");

function showVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    messageBox.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const difference = now - Number(lastVisit);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days < 1) {
      messageBox.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      messageBox.textContent = "You last visited 1 day ago.";
    } else {
      messageBox.textContent = `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

showVisitMessage();

/* Create cards */

console.log(huatulcoPlaces);

const showHere = document.querySelector("#discover-grid");


function displayItems(huatulcoPlaces) {
    huatulcoPlaces.forEach(place => {
        // build the card elements
        const card = document.createElement("div")
        // build the photo element
        const photo = document.createElement("img")
        photo.src = place.image
        photo.alt = `${place.name} image`
        photo.loading = "lazy"
        photo.width = "300"
        photo.height = "200"
        card.appendChild(photo)

        // build the name element
        const name = document.createElement("h2")
        name.innerText = place.name
        card.appendChild(name)

        // build the address element
        const address = document.createElement("address")
        address.innerText = place.address
        card.appendChild(address)

        // build the description element
        const description = document.createElement("p")
        description.innerText = place.description
        card.appendChild(description)

        // add the card to the display area
        showHere.appendChild(card)
    })
}

displayItems(huatulcoPlaces);
