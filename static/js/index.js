// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Select all tabs and content sections
    const tabs = document.querySelectorAll("nav a");
    const tabContents = document.querySelectorAll(".tab-content");

    // Function to activate the clicked tab and show its content
    function activateTab(tabId) {
        // Hide all tab content
        tabContents.forEach(content => content.style.display = "none");

        // Remove 'active' class from all tabs
        tabs.forEach(tab => tab.classList.remove("active"));

        // Show the selected tab content
        document.querySelector(`#${tabId}-content`).style.display = "block";

        // Add 'active' class to the clicked tab
        document.getElementById(`${tabId}-tab`).classList.add("active");
    }

    // Add click event listeners to each tab
    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            const tabId = tab.id.split("-")[0]; // Get the tab ID (e.g., 'home', 'recommend', 'predict')
            activateTab(tabId);
        });
    });

    // Set the default active tab (Home)
    activateTab("home");
});

        // Initialize Select2 for dropdowns
        $(document).ready(function() {
            $('#location').select2({
                placeholder: 'Select a location',
                allowClear: true,
                width: '100%'
            });
            $('#room_type').select2();
        });

    let index = 0;
    const slides = document.querySelectorAll('.carousel-slide');

    function showSlide() {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide();
    }

    setInterval(nextSlide, 5000); // Change slide every 5 seconds
