// WINESKIN - Shared JavaScript

// ==================== CART SYSTEM ====================
const CART_KEY = 'wineskin_cart';
const WISHLIST_KEY = 'wineskin_wishlist';

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Add item to cart
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: product.quantity || 1
        });
    }
    
    saveCart(cart);
    showToast('Added to your bag ✓');
}

// Remove item from cart
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCartPage();
}

// Update item quantity
function updateQuantity(id, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        saveCart(cart);
        renderCartPage();
    }
}

// Get total cart count
function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

// Get cart total price
function getCartTotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Update cart badge in nav
function updateCartBadge() {
    const badge = document.querySelector('.nav-icon-badge');
    if (badge) {
        const count = getCartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Render cart page
function renderCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartWithItems = document.getElementById('cartWithItems');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    const cart = getCart();
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartWithItems) cartWithItems.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartWithItems) cartWithItems.style.display = 'grid';
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="category">${item.category || 'Leather Goods'}</p>
                    <p class="price">₹${item.price.toLocaleString()}</p>
                    <div class="cart-item-qty">
                        <button onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <span class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</span>
            </div>
        `).join('');
    }
    
    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 299;
    const total = subtotal + shipping;
    
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString();
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString();
    if (totalEl) totalEl.textContent = '₹' + total.toLocaleString();
}

// ==================== WISHLIST SYSTEM ====================
function getWishlist() {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

function addToWishlist(product) {
    const wishlist = getWishlist();
    if (!wishlist.find(item => item.id === product.id)) {
        wishlist.push(product);
        saveWishlist(wishlist);
        showToast('Added to wishlist ✓');
    } else {
        showToast('Already in wishlist');
    }
}

function removeFromWishlist(id) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id !== id);
    saveWishlist(wishlist);
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
}

// ==================== PAGE LOADER ====================
function initPageLoader() {
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) loader.classList.add('hidden');
    }, 1500);
}

// ==================== CUSTOM CURSOR ====================
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
    
    document.querySelectorAll('a, button, .nav-icon, .quick-view, .add-to-bag, .filter-btn, .qty-btn, .accordion-header').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorRing.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
    });
    
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('clicking');
        cursorRing.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('clicking');
        cursorRing.classList.remove('clicking');
    });
    
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.add('hidden');
        cursorRing.classList.add('hidden');
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('hidden');
        cursorRing.classList.remove('hidden');
    });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ==================== SEARCH OVERLAY ====================
function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.querySelector('.search-input')?.focus();
    }
}

function closeSearch() {
    document.getElementById('searchOverlay')?.classList.remove('active');
}

// ==================== MOBILE MENU ====================
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

// ==================== INTERSECTION OBSERVER ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-up').forEach(el => {
        fadeObserver.observe(el);
    });
}

// ==================== STATS COUNTER ====================
function initStatsCounter() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number, .count-up');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + (stat.getAttribute('data-suffix') || '+');
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 30);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.craft-stats, .stats-grid').forEach(el => {
        statsObserver.observe(el);
    });
}

// ==================== TIMELINE ANIMATION ====================
function initTimelineAnimation() {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.timeline-item').forEach(el => {
        timelineObserver.observe(el);
    });
}

// ==================== ACCORDION ====================
function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ==================== NEWSLETTER ====================
function handleSubscribe(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input) input.value = '';
    const success = document.getElementById('newsletterSuccess');
    if (success) {
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 3000);
    }
    showToast('Subscribed successfully ✓');
}

// ==================== PRODUCT FILTER ====================
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category || (category === 'All' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    // Filter cards
    document.querySelectorAll('.product-card').forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'All' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            setTimeout(() => card.style.opacity = '1', 50);
        } else {
            card.classList.add('hidden');
        }
    });
}

// ==================== QUICK VIEW MODAL ====================
function openQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    
    modal.querySelector('.modal-image img').src = product.image;
    modal.querySelector('.modal-details h2').textContent = product.name;
    modal.querySelector('.modal-details .category').textContent = product.category;
    modal.querySelector('.modal-details .price').textContent = '₹' + product.price.toLocaleString();
    
    const addBtn = modal.querySelector('.add-to-bag-btn');
    if (addBtn) {
        addBtn.onclick = () => {
            addToCart(product);
            closeQuickView();
        };
    }
    
    modal.classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickViewModal')?.classList.remove('active');
}

// ==================== PRODUCT DATA ====================
const productsData = [
    // Women's Collection
    { id: 1, name: 'Bordeaux Tote', price: 12500, category: 'Totes', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', rating: 4.8, reviews: 124, description: 'A spacious tote crafted from premium full-grain leather. The Bordeaux Tote features reinforced handles and a classic silhouette that complements any outfit.' },
    { id: 2, name: 'Milano Crossbody', price: 9800, category: 'Crossbody', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', rating: 4.7, reviews: 98, description: 'The perfect companion for city adventures. Adjustable strap and multiple compartments keep your essentials organized.' },
    { id: 3, name: 'Evening Clutch', price: 6500, category: 'Clutches', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80', rating: 4.9, reviews: 86, description: 'Elegant evening clutch in supple leather with a magnetic closure. Perfect for formal occasions.' },
    { id: 4, name: 'Sling Mini', price: 7200, category: 'Sling Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', rating: 4.6, reviews: 72, description: 'Compact yet functional, the Sling Mini is designed for the modern minimalist.' },
    { id: 5, name: 'Travel Tote', price: 14500, category: 'Totes', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80', rating: 4.8, reviews: 156, description: 'Your perfect travel companion with a luggage sleeve and multiple interior pockets.' },
    { id: 6, name: 'Day Crossbody', price: 8900, category: 'Crossbody', image: 'https://images.unsplash.com/photo-1591561954557-26941169b09e?w=600&q=80', rating: 4.7, reviews: 103, description: 'Versatile crossbody that transitions effortlessly from day to night.' },
    { id: 7, name: 'Beige Clutch', price: 5800, category: 'Clutches', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80', rating: 4.5, reviews: 64, description: 'Natural-toned clutch in vegetable-tanned leather that develops a beautiful patina over time.' },
    { id: 8, name: 'Compact Sling', price: 6200, category: 'Sling Bags', image: 'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=600&q=80', rating: 4.6, reviews: 89, description: 'Streamlined sling bag with quick-access front pocket.' },
    
    // Men's Collection
    { id: 9, name: 'Classic Briefcase', price: 18500, category: 'Briefcases', image: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&q=80', rating: 4.9, reviews: 201, description: 'Timeless briefcase for the discerning professional. Fits laptops up to 15".' },
    { id: 10, name: 'Messenger Pro', price: 13200, category: 'Messengers', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', rating: 4.7, reviews: 145, description: 'Professional messenger bag with padded laptop compartment.' },
    { id: 11, name: 'Weekend Duffel', price: 22000, category: 'Duffels', image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80', rating: 4.8, reviews: 178, description: 'Spacious duffel for weekend getaways. Includes a shoe compartment.' },
    { id: 12, name: 'Slim Bifold', price: 3800, category: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594913?w=600&q=80', rating: 4.6, reviews: 234, description: 'Minimalist wallet that fits comfortably in any pocket.' },
    { id: 13, name: 'Leather Belt', price: 4500, category: 'Belts', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80', rating: 4.7, reviews: 167, description: 'Handcrafted leather belt with brushed brass buckle.' },
    { id: 14, name: 'Portfolio Bag', price: 16800, category: 'Briefcases', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80', rating: 4.8, reviews: 112, description: 'Sleek portfolio for documents and slim laptops.' },
    { id: 15, name: 'City Messenger', price: 11500, category: 'Messengers', image: 'https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1?w=600&q=80', rating: 4.5, reviews: 98, description: 'Urban messenger designed for the daily commute.' },
    { id: 16, name: 'Card Holder', price: 2200, category: 'Wallets', image: 'https://images.unsplash.com/photo-1606503825008-909a6184ad62?w=600&q=80', rating: 4.8, reviews: 312, description: 'Ultra-slim card holder for the essentials.' },
    
    // Accessories
    { id: 17, name: 'Leather Keychain', price: 1200, category: 'Keychains', image: 'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=600&q=80', rating: 4.5, reviews: 87, description: 'Durable keychain with brass hardware.' },
    { id: 18, name: 'Card Case Pro', price: 2800, category: 'Card Cases', image: 'https://images.unsplash.com/photo-1606503825008-909a6184ad62?w=600&q=80', rating: 4.7, reviews: 156, description: 'Premium card case with multiple slots.' },
    { id: 19, name: 'Passport Holder', price: 3500, category: 'Passport Holders', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', rating: 4.8, reviews: 203, description: 'Elegant passport holder with card slots.' },
    { id: 20, name: 'Watch Strap', price: 4500, category: 'Watch Straps', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80', rating: 4.6, reviews: 134, description: 'Genuine leather watch strap, quick-release pins.' },
    { id: 21, name: 'Luggage Tag', price: 1500, category: 'Luggage Tags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80', rating: 4.4, reviews: 76, description: 'Distinguish your luggage with this elegant tag.' },
    { id: 22, name: 'Coin Pouch', price: 1800, category: 'Coin Purses', image: 'https://images.unsplash.com/photo-1627123424574-724758594913?w=600&q=80', rating: 4.5, reviews: 98, description: 'Compact pouch for coins and small items.' },
    { id: 23, name: 'Cable Organizer', price: 2200, category: 'Accessories', image: 'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=600&q=80', rating: 4.3, reviews: 67, description: 'Keep your cables tangle-free.' },
    { id: 24, name: 'Notebook Cover', price: 5500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80', rating: 4.7, reviews: 145, description: 'Refillable leather notebook cover.' }
];

function getProductById(id) {
    return productsData.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
    return productsData.filter(p => p.category === category);
}

// ==================== PRODUCT PAGE ====================
function initProductPage() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (!productId) return;
    
    const product = getProductById(productId);
    if (!product) return;
    
    // Fill product details
    document.querySelector('.product-details h1')?.textContent = product.name;
    document.querySelector('.product-details .category-label')?.textContent = product.category;
    document.querySelector('.product-details .price')?.textContent = '₹' + product.price.toLocaleString();
    document.querySelector('.product-details .rating')?.innerHTML = '★'.repeat(Math.floor(product.rating)) + ' <span>(' + product.reviews + ' reviews)</span>';
    document.querySelector('.product-details .description')?.textContent = product.description;
    document.querySelector('.product-main-image img')?.src = product.image;
    
    // Setup thumbnails
    document.querySelectorAll('.product-thumbnails img').forEach((thumb, i) => {
        if (i === 0) {
            thumb.src = product.image;
            thumb.classList.add('active');
        }
        thumb.addEventListener('click', () => {
            document.querySelector('.product-main-image img').src = thumb.src;
            document.querySelectorAll('.product-thumbnails img').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
    
    // Setup add to bag
    const addBtn = document.querySelector('.product-actions .btn-wine');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const qty = parseInt(document.querySelector('.qty-controls span')?.textContent || 1);
            addToCart({ ...product, quantity: qty });
        });
    }
    
    // Setup quantity controls
    const qtySpan = document.querySelector('.qty-controls span');
    document.querySelector('.qty-controls button:first-child')?.addEventListener('click', () => {
        let qty = parseInt(qtySpan?.textContent || 1);
        if (qty > 1) qtySpan.textContent = qty - 1;
    });
    document.querySelector('.qty-controls button:last-child')?.addEventListener('click', () => {
        let qty = parseInt(qtySpan?.textContent || 1);
        qtySpan.textContent = qty + 1;
    });
    
    // Setup wishlist
    document.querySelector('.btn-wishlist')?.addEventListener('click', () => {
        addToWishlist(product);
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initStatsCounter();
    initTimelineAnimation();
    initAccordion();
    updateCartBadge();
    renderCartPage();
    initProductPage();
    
    // Search overlay click outside
    document.getElementById('searchOverlay')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('searchOverlay')) {
            closeSearch();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
            closeMobileMenu();
            closeQuickView();
        }
    });
    
    // Checkout button
    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
        alert('Checkout coming soon!');
    });
});
