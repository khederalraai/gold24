// ========================================
// Smooth Scroll Configuration
// ========================================
document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Navigation Functionality
    // ========================================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // Smooth Scrolling for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Animations
    // ========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateOnScroll = document.querySelectorAll('.featured-item, .gallery-item, .about-content, .contact-grid');
    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // ========================================
    // Gallery Item Interactions with 3D Effects
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const galleryImage = item.querySelector('.gallery-image');
        let isFlipped = false;

        // 3D Tilt Effect on Mouse Move
        item.addEventListener('mousemove', function(e) {
            if (isFlipped) return; // Don't tilt when flipped

            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            if (galleryImage) {
                galleryImage.style.setProperty('--rotate-x', `${-rotateX}deg`);
                galleryImage.style.setProperty('--rotate-y', `${rotateY}deg`);
            }
        });

        item.addEventListener('mouseleave', function() {
            if (galleryImage && !isFlipped) {
                galleryImage.style.setProperty('--rotate-x', '0deg');
                galleryImage.style.setProperty('--rotate-y', '0deg');
            }
        });

        // 3D Card Flip on Click
        item.addEventListener('click', function(e) {
            // Don't flip if clicking the "Details Ansehen" button
            if (e.target.classList.contains('view-button')) {
                e.stopPropagation();

                // Get product data
                const title = this.querySelector('h4').textContent;
                const price = this.querySelector('.price').textContent;
                const category = this.dataset.category;

                // Extract details from the back face
                const detailItems = this.querySelectorAll('.gallery-back .detail-item');
                const details = [];
                detailItems.forEach(item => {
                    const spans = item.querySelectorAll('span');
                    if (spans.length === 2) {
                        details.push({
                            label: spans[0].textContent.replace(':', ''),
                            value: spans[1].textContent
                        });
                    }
                });

                // Determine jewelry type
                let type = 'ring';
                if (category.includes('kette')) type = 'necklace';
                else if (category.includes('armband') || category.includes('armbänder')) type = 'bracelet';
                else if (category.includes('ohrring')) type = 'earring';

                // Open 3D Viewer
                if (window.viewer3D) {
                    window.viewer3D.show({
                        name: title,
                        price: price,
                        type: type,
                        details: details
                    });
                }

                return;
            }

            isFlipped = !isFlipped;
            this.classList.toggle('flipped');

            // Reset tilt when flipping
            if (galleryImage) {
                galleryImage.style.setProperty('--rotate-x', '0deg');
                galleryImage.style.setProperty('--rotate-y', '0deg');
            }
        });

        // Z-index management
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            if (!isFlipped) {
                this.style.zIndex = '1';
            }
        });
    });

    // ========================================
    // Featured Items Interaction
    // ========================================
    const featuredItems = document.querySelectorAll('.featured-item');

    featuredItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Show success message (you would send to backend here)
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Wird gesendet...';
            submitButton.disabled = true;

            // Simulate sending (replace with actual API call)
            setTimeout(() => {
                submitButton.textContent = 'Nachricht gesendet!';
                submitButton.style.background = '#27ae60';

                // Reset form
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });

        // Input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    // ========================================
    // Parallax Effect on Hero
    // ========================================
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // ========================================
    // Cursor Effect (Optional Enhancement)
    // ========================================
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Smooth cursor following
        function animateCursor() {
            const speed = 0.15;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .gallery-item, .featured-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.borderColor = 'var(--accent-hover)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--accent-color)';
            });
        });
    }

    // ========================================
    // Image Lazy Loading Enhancement
    // ========================================
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.1 });

    imagePlaceholders.forEach(placeholder => {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'scale(0.95)';
        placeholder.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(placeholder);
    });

    // ========================================
    // Dynamic Text Animation for Hero
    // ========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.line');
        lines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';

            // Split text into characters
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                span.style.animation = `charAppear 0.5s ease forwards ${(index * 0.2) + (i * 0.03)}s`;
                line.appendChild(span);
            });
        });
    }

    // Add keyframes for character animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes charAppear {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // ========================================
    // Performance: Debounce Scroll Events
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy operations
    window.addEventListener('scroll', debounce(() => {
        // Additional scroll-based animations can be added here
    }, 10));

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c✨ Willkommen bei GOLD24 ✨', 'font-size: 20px; font-weight: bold; color: #d4af37;');
    console.log('%cHandgefertigter Luxusschmuck seit 1950', 'font-size: 14px; color: #a0a0a0;');
});

// ========================================
// Page Load Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});