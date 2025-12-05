document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    let currentSlide = 0;
    let totalSlides = 0;

    // Load image from json
    fetch("data/events.json")
        .then(res => res.json())
        .then(data => {
            const events = data.events;

            events.forEach(evt => {
                const img = document.createElement("img");
                img.src = evt.image;
                img.alt = evt.name;
                slider.appendChild(img);
            });

            totalSlides = events.length;
        });

    // Slide function
    function moveSlider(n) {
        currentSlide = (currentSlide + n + totalSlides) % totalSlides;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Buttons
    document.querySelector(".prev").addEventListener("click", () => moveSlider(-1));
    document.querySelector(".next").addEventListener("click", () => moveSlider(1));

    // Change each 5 sec
    setInterval(() => moveSlider(1), 5000);
});