// ── Cookie notice ──
// Injects the cookie banner into every page that loads this script.
// No HTML needed in individual pages — just <script src="js/cookie.js"></script>

(function() {
  // Don't show if already dismissed
  if (localStorage.getItem('cookieSeen')) return;

  // Create the banner
  const notice = document.createElement('div');
  notice.className = 'cookie-notice';
  notice.id = 'cookieNotice';
  notice.innerHTML = `
    This site uses analytics cookies to understand how visitors engage with our content.
    <button id="cookieAccept">Got it</button>
  `;

  // Add to page
  document.body.appendChild(notice);

  // Dismiss on click
  document.getElementById('cookieAccept').addEventListener('click', () => {
    notice.style.display = 'none';
    localStorage.setItem('cookieSeen', '1');
  });
})();