document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Selektor Elemen ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const aboutText = document.getElementById('about-text');
    const backToTop = document.getElementById('back-to-top');

    // --- 2. Animasi Initial Load ---
    if (aboutText) {
        setTimeout(() => {
            aboutText.classList.remove('opacity-0', 'translate-y-4');
            aboutText.classList.add('opacity-100', 'translate-y-0');
        }, 300);
    }

    // --- 3. Logika Navigasi Mobile ---
    const openMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
        if (menuIcon) menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
        if (menuIcon) menuIcon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
        document.body.style.overflow = 'auto';
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('translate-x-0');
            isOpen ? closeMobileMenu() : openMobileMenu();
        });
    }

    // Tutup menu jika klik di luar area menu
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // --- 4. Scroll Events (Back to Top) ---
    window.addEventListener('scroll', () => {
        if (backToTop) {
            const shouldShow = window.scrollY > 400;
            backToTop.classList.toggle('opacity-100', shouldShow);
            backToTop.classList.toggle('visible', shouldShow);
            backToTop.classList.toggle('translate-y-0', shouldShow);
            backToTop.classList.toggle('opacity-0', !shouldShow);
            backToTop.classList.toggle('invisible', !shouldShow);
            backToTop.classList.toggle('translate-y-10', !shouldShow);
        }
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 5. Modal Gambar (Global Functions) ---
    window.openModal = function(src) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        if (modal && modalImg) {
            modal.classList.remove('hidden');
            modalImg.src = src;
            setTimeout(() => {
                modalImg.classList.replace('scale-95', 'scale-100');
                modalImg.classList.replace('opacity-0', 'opacity-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        if (modal && modalImg) {
            modalImg.classList.replace('scale-100', 'scale-95');
            modalImg.classList.replace('opacity-100', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 200);
        }
    };
});