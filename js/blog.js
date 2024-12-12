document.addEventListener('DOMContentLoaded', function() {
    // Get the current page URL
    const currentPage = window.location.pathname;
    
    // Get all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Loop through menu items and add active class to the current page
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        const href = link.getAttribute('href');
        
        // Check if the current page matches the menu item's href
        if (currentPage.endsWith(href)) {
            item.classList.add('active');
        }
    });
});
