document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.querySelector('.menu');
    const slideshowImages = document.querySelectorAll('.slideshow img');
    let currentSlide = 0;

    // Toogle Description Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const description = document.getElementById('description');

    menuToggle.addEventListener('mouseenter', function() {
        description.classList.add('fade');
    });

    menuToggle.addEventListener('mouseleave', function() {
        description.classList.remove('fade');
    });

    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        menu.classList.toggle('open');
        menuBtn.innerHTML = menuBtn.classList.contains('open') ?  '<i class="fa-solid fa-plus"></i>' : '<i class="fas fa-plus"></i>';
    });

    // Slideshow functionality
    function showNextSlide() {
        slideshowImages[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slideshowImages.length;
        slideshowImages[currentSlide].classList.add('active');
    }

    setInterval(showNextSlide, 4000);
});

// Add interactivity to the navigation bar
document.querySelectorAll(".sidebar .menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Remove active class from all links
      document.querySelectorAll(".sidebar .menu a").forEach((link) => {
        link.classList.remove("active");
      });
  
      // Add active class to the clicked link
      e.target.classList.add("active");
    });
  });
  
  // Toggle the donate button hover effect
  const donateButton = document.querySelector(".donate");
  donateButton.addEventListener("mouseover", () => {
    donateButton.style.backgroundColor = "#ff4040";
  });
  donateButton.addEventListener("mouseout", () => {
    donateButton.style.backgroundColor = "#a00000";
  });
  
  // Language selector confirmation message
  const languageSelector = document.getElementById("language");
  languageSelector.addEventListener("change", () => {
    alert(`Language changed to: ${languageSelector.value}`);
  });