/* =========================================================
   Mohotarima Mesko — Portfolio Script
   Vanilla JS only: mobile menu, smooth scroll, image modal,
   active navigation highlighting, scroll reveal animation.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile Menu Toggle ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close mobile menu after tapping a nav link
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Header Shadow on Scroll ---------- */
    const header = document.getElementById('header');
    const handleHeaderShadow = () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    };
    handleHeaderShadow();
    window.addEventListener('scroll', handleHeaderShadow, { passive: true });

    /* ---------- Smooth Scrolling for Anchor Links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---------- Active Navigation Highlighting ---------- */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveLink = () => {
        let currentId = '';
        const scrollPos = window.scrollY + 120; // offset for fixed header

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink, { passive: true });

    /* ---------- Scroll Reveal Animation ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: reveal everything immediately if IntersectionObserver unsupported
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- Image Modal (Gallery) ---------- */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');
    let lastFocusedElement = null;

    const openModal = (src, alt) => {
        lastFocusedElement = document.activeElement;
        modalImage.src = src;
        modalImage.alt = alt;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    };

    const closeModal = () => {
        modal.hidden = true;
        modalImage.src = '';
        document.body.style.overflow = '';
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullSrc = item.getAttribute('data-full');
            const imgAlt = item.querySelector('img')?.getAttribute('alt') || '';
            openModal(fullSrc, imgAlt);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        // Close when clicking the dark backdrop (outside the image)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) {
            closeModal();
        }
    });

    /* ---------- Footer Year ---------- */
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

});