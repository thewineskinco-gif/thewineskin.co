// WINESKIN - Complete JavaScript
// All functionality for the luxury leather goods website

// ============================================
// PRODUCT DATA
// ============================================
const productsData = [
    // BELTS
    { id: 1, name: 'Classic Tan Belt', price: 0, category: 'Belts', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80', badge: 'Bestseller', description: 'Full-grain vegetable tanned' },
    { id: 2, name: 'Formal Black Belt', price: 0, category: 'Belts', image: 'https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1?w=600&q=80', badge: '', description: 'Sleek full-grain leather' },
    { id: 3, name: 'Braided Leather Belt', price: 0, category: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', badge: 'New', description: 'Hand-braided cognac' },
    // WALLETS
    { id: 4, name: 'Slim Bifold', price: 0, category: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594913?w=600&q=80', badge: 'Popular', description: 'Minimalist, 6 card slots' },
    { id: 5, name: 'Classic Trifold', price: 0, category: 'Wallets', image: 'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=600&q=80', badge: '', description: 'Spacious with coin pocket' },
    { id: 6, name: 'Zip Around Wallet', price: 0, category: 'Wallets', image: 'https://images.unsplash.com/photo-1606503825008-909a6184ad62?w=600&q=80', badge: 'Premium', description: 'Full-zip, 12 card slots' }
];

const WHATSAPP_NUMBER = '919876543210';

// ============================================
// PAGE LOADER
// ============================================
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });

    // Failsafe - force hide after 3 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);
}

// ============================================
// CUSTOM CURSOR (Desktop Only)
// ============================================
function initCustomCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    if (!cursorDot || !cursorRing) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    const lerpSpeed = 0.12;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * lerpSpeed;
        ringY += (mouseY - ringY) * lerpSpeed;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    document.querySelectorAll('a, button, .nav-icon, .product-card, .category-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorRing.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.add('hidden');
        cursorRing.classList.add('hidden');
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('hidden');
        cursorRing.classList.remove('hidden');
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ============================================
// MOBILE MENU - FIXED
// ============================================
function openMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeSearch();
        }
    });

    // Close when clicking outside
    menu.addEventListener('click', (e) => {
        if (e.target === menu) {
            closeMobileMenu();
        }
    });

    // Touch swipe to close
    let touchStartX = 0;
    menu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    menu.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            closeMobileMenu();
        }
    }, { passive: true });
}

// ============================================
// SEARCH OVERLAY
// ============================================
function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.querySelector('.search-input')?.focus();
        document.body.style.overflow = 'hidden';
    }
}

function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// SCROLL ANIMATIONS - Intersection Observer
// ============================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // Failsafe - show all after 3 seconds
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 3000);
}

// ============================================
// STATS COUNTER - FIXED AND WORKING
// ============================================
function initStatsCounter() {
    const statsSection = document.querySelector('.craft-stats');
    if (!statsSection) return;

    const statYears = document.querySelector('.stat-years');
    const statGrain = document.querySelector('.stat-grain');
    const statClients = document.querySelector('.stat-clients');

    function animateValue(element, target, duration = 2000, suffix = '') {
        if (!element) return;
        
        let startTimestamp = null;
        const startValue = 0;

        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3); // easeOut cubic
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target + suffix;
            }
        }

        window.requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
        // Fallback - animate immediately
        animateValue(statYears, 15, 2000, '+');
        animateValue(statGrain, 100, 2000, '%');
        animateValue(statClients, 5000, 2000, '+');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(statYears, 15, 2000, '+');
                animateValue(statGrain, 100, 2000, '%');
                animateValue(statClients, 5000, 2000, '+');
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// NEWSLETTER FORM - VALIDATION
// ============================================
function handleSubscribe(e) {
    e.preventDefault();
    const emailInput = document.getElementById('emailInput');
    const messageEl = document.getElementById('newsletterMessage');
    
    if (!emailInput || !messageEl) return;

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        messageEl.textContent = 'Please enter your email address.';
        messageEl.className = 'newsletter-message error';
        return;
    }

    if (!emailRegex.test(email)) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.className = 'newsletter-message error';
        return;
    }

    // Success
    messageEl.textContent = 'Welcome to Wineskin. Check your inbox for confirmation.';
    messageEl.className = 'newsletter-message success';
    emailInput.value = '';
    showToast('Subscribed successfully ✓');

    // Clear message after 5 seconds
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'newsletter-message';
    }, 5000);
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    grid.innerHTML = productsData.map(product => `
        <div class="product-card fade-up" data-category="${product.category}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.description}</p>
                <p class="enquire-text">Enquire for Price</p>
                <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}%20from%20Wineskin.%20Please%20share%20more%20details." 
                   target="_blank" class="btn btn-whatsapp">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Enquire on WhatsApp
                </a>
            </div>
        </div>
    `).join('');
}

// ============================================
// MODAL
// ============================================
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initStatsCounter();
    initSmoothScroll();
    renderProducts();

    // Search overlay click outside
    document.getElementById('searchOverlay')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('searchOverlay')) {
            closeSearch();
        }
    });
});
