// ── Render project cards ──
const grid = document.getElementById('projectsGrid');

Object.entries(GALLERY_DATA).forEach(([key, project]) => {
  const top   = project.images.slice(0, 3);

  const card = document.createElement('div');
  card.className = 'project-card';

  card.innerHTML = `
    <div class="stack-wrap">
      <div class="stack-img s1" style="background-image:url('${project.folder}${top[2] || top[0]}')"></div>
      <div class="stack-img s2" style="background-image:url('${project.folder}${top[1] || top[0]}')"></div>
      <div class="stack-img s3" style="background-image:url('${project.folder}${top[0]}')"></div>
    </div>
    <div class="card-info">
      <p class="card-title">${project.title}</p>
      <p class="card-meta">${project.meta}</p>

    </div>
  `;

  card.addEventListener('click', () => openOverlay(project));
  grid.appendChild(card);
});

// ── Overlay ──
const overlay      = document.getElementById('galleryOverlay');
const closeBtn     = document.getElementById('galleryClose');
const overlayLabel = document.getElementById('overlayLabel');
const overlayTitle = document.getElementById('overlayTitle');
const overlayGrid  = document.getElementById('overlayGrid');
const modal        = document.querySelector('.gallery-modal');

function openOverlay(project) {
  overlayLabel.textContent = project.meta;
  overlayTitle.textContent = project.title;
  overlayGrid.innerHTML = project.images.map(filename =>
    `<img src="${project.folder}${filename}" alt="${project.title}" class="overlay-img">`
  ).join('');

  const imgs = overlayGrid.querySelectorAll('.overlay-img');
  imgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(project, i));
  });

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── Lightbox ──
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentProject = null;
let currentIndex   = 0;

function openLightbox(project, index) {
  currentProject = project;
  currentIndex   = index;
  showLightboxImage();
  lightbox.classList.add('open');
}

function showLightboxImage() {
  const filename = currentProject.images[currentIndex];
  lightboxImg.src = currentProject.folder + filename;
  lightboxPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
  lightboxNext.style.opacity = currentIndex === currentProject.images.length - 1 ? '0.3' : '1';
}

function lightboxPrevImage() {
  if (currentIndex > 0) { currentIndex--; showLightboxImage(); }
}

function lightboxNextImage() {
  if (currentIndex < currentProject.images.length - 1) { currentIndex++; showLightboxImage(); }
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

lightboxPrev.addEventListener('click', e => { e.stopPropagation(); lightboxPrevImage(); });
lightboxNext.addEventListener('click', e => { e.stopPropagation(); lightboxNextImage(); });
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
});

// Keyboard
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  lightboxPrevImage();
  if (e.key === 'ArrowRight') lightboxNextImage();
  if (e.key === 'Escape')     closeLightbox();
});

// Swipe
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? lightboxNextImage() : lightboxPrevImage();
  }
});

function closeOverlay() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  modal.scrollTop = 0;
}

closeBtn.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

// ── Slideshow ──
const slides   = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('slideDots');
let current    = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dotsWrap.appendChild(dot);
});

function getDots() { return document.querySelectorAll('.dot'); }

function goToSlide(n) {
  slides[current].classList.remove('active');
  getDots()[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  getDots()[current].classList.add('active');
}

setInterval(() => goToSlide(current + 1), 4000);