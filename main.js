document.addEventListener("DOMContentLoaded", () => {
    
    // 1. THEME TOGGLE (LIGHT / DARK MODE)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Cek preferensi sebelumnya, default ke Light (tidak ada class dark)
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // 2. STICKY NAVBAR EFFECT
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('py-5');
        } else {
            navbar.classList.remove('nav-scrolled');
            navbar.classList.add('py-5');
        }
    });

    // 3. SCROLLSPY (Highlight menu)
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // Set class 'active' ke menu yang sesuai id section
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. MOBILE MENU TOGGLE (Unified Menu with Smooth Icon Spin)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = document.getElementById('mobile-menu-icon');
    const navMenu = document.getElementById('nav-links');

    const toggleMenu = () => {
        // Toggle slide menu
        navMenu.classList.toggle('translate-x-full');

        // Animasi putar & mengecil saat transisi
        menuIcon.classList.add('rotate-180', 'scale-0');
        
        // Ganti ikon tepat di tengah-tengah durasi animasi (150ms)
        setTimeout(() => {
            if (navMenu.classList.contains('translate-x-full')) {
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            } else {
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            }
            // Kembalikan ke ukuran semula & hilangkan rotasi
            menuIcon.classList.remove('scale-0', 'rotate-180');
        }, 150);
    };

    mobileBtn.addEventListener('click', toggleMenu);

    // Menutup menu mobile otomatis jika salah satu link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && !navMenu.classList.contains('translate-x-full')) {
                toggleMenu();
            }
        });
    });

    // 5. HERO & PORTFOLIO SLIDER
    new Swiper('.heroSwiper', {
        loop: true,
        effect: 'fade',
        autoplay: { delay: 6000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    new Swiper('.portfolioSwiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
        breakpoints: {
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 30 }
        }
    });

    // 6. SCROLL TO TOP BUTTON
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.add('opacity-50');
        } else {
            scrollTopBtn.classList.remove('opacity-50');
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});