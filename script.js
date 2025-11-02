document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const yearEl = document.getElementById('year');

  // Toggle menu mobile
  menuToggle?.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'block';
    navLinks.style.display = isVisible ? 'none' : 'block';
    navLinks.style.flexDirection = 'column';
    navLinks.style.gap = '12px';
    navLinks.style.opacity = isVisible ? '0' : '1';
    navLinks.style.transition = 'opacity 0.3s ease';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth < 900) navLinks.style.display = 'none';
      }
    });
  });

  // Tahun otomatis
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Efek fade-in saat scroll
  const reveal = () => {
    document.querySelectorAll('.section').forEach(section => {
      const top = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        section.style.opacity = 1;
        section.style.transform = 'translateY(0)';
      }
    });
  };

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', reveal);
  reveal();

  // ======================
  // Carousel functionality
  // ======================
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let index = 0;

    const showImage = (i) => {
      images.forEach((img, idx) => {
        img.classList.toggle('active', idx === i);
      });
    };

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      showImage(index);
    });

    // Auto slide every 5 seconds
    setInterval(() => {
      index = (index + 1) % images.length;
      showImage(index);
    }, 5000);
  });
});
