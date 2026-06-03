/**
 * Wineskin Hero Carousel
 * Zero-glitch auto-sliding image carousel with double-buffering
 * Features: Preloading, Page Visibility API, prefers-reduced-motion, full accessibility
 */

(function() {
  'use strict';

  const CAROUSEL_CONFIG = {
    interval: 4000,          // 4 seconds per slide
    transitionDuration: 800, // 800ms crossfade
    preloadAhead: 2,         // Preload next 2 images
  };

  class HeroCarousel {
    constructor(container) {
      this.container = container;
      this.slides = [];
      this.currentIndex = 0;
      this.isPlaying = true;
      this.timer = null;
      this.preferredMotion = true;
      this.touchStartX = 0;
      this.touchEndX = 0;
      
      // DOM elements
      this.layerA = null;
      this.layerB = null;
      this.activeLayer = 'A';
      this.indicators = null;
      this.prevBtn = null;
      this.nextBtn = null;
      this.liveRegion = null;
      
      this.init();
    }

    init() {
      this.checkReducedMotion();
      this.buildDOM();
      this.loadSlides();
      this.setupEventListeners();
      this.startAutoplay();
      this.preloadUpcoming();
    }

    checkReducedMotion() {
      this.preferredMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!this.preferredMotion) {
        CAROUSEL_CONFIG.transitionDuration = 0;
      }
    }

    buildDOM() {
      // Get slide data from data attribute or default
      const slideData = this.container.dataset.slides;
      if (slideData) {
        try {
          this.slides = JSON.parse(slideData);
        } catch (e) {
          console.warn('Invalid slides data, using defaults');
          this.slides = this.getDefaultSlides();
        }
      } else {
        this.slides = this.getDefaultSlides();
      }

      // Clear container and build structure
      this.container.innerHTML = `
        <div class="hero-carousel-layers" aria-hidden="false">
          <div class="hero-carousel-layer hero-carousel-layer-a" data-layer="A"></div>
          <div class="hero-carousel-layer hero-carousel-layer-b" data-layer="B"></div>
        </div>
        
        <div class="hero-carousel-overlay"></div>
        
        <button class="hero-carousel-nav hero-carousel-prev" aria-label="Previous slide" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <button class="hero-carousel-nav hero-carousel-next" aria-label="Next slide" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
        
        <div class="hero-carousel-indicators" role="tablist" aria-label="Slide indicators"></div>
        
        <div class="hero-carousel-live-region" aria-live="polite" aria-atomic="true"></div>
      `;

      // Cache DOM references
      this.layerA = this.container.querySelector('.hero-carousel-layer-a');
      this.layerB = this.container.querySelector('.hero-carousel-layer-b');
      this.indicators = this.container.querySelector('.hero-carousel-indicators');
      this.prevBtn = this.container.querySelector('.hero-carousel-prev');
      this.nextBtn = this.container.querySelector('.hero-carousel-next');
      this.liveRegion = this.container.querySelector('.hero-carousel-live-region');

      // Build indicators
      this.buildIndicators();
      
      // Set initial slide
      this.setInitialSlide();
    }

    getDefaultSlides() {
      // Default fallback images (Unsplash leather/goods images)
      return [
        {
          src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=80',
          webp: null,
          alt: 'Luxury leather handbag on wooden surface'
        },
        {
          src: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=1920&q=80',
          webp: null,
          alt: 'Premium leather craft workshop'
        },
        {
          src: 'https://images.unsplash.com/photo-1606503825008-909a6184ad62?w=1920&q=80',
          webp: null,
          alt: 'Elegant leather accessories collection'
        }
      ];
    }

    buildIndicators() {
      this.indicators.innerHTML = this.slides.map((_, index) => `
        <button 
          class="hero-carousel-dot${index === 0 ? ' active' : ''}" 
          data-slide="${index}"
          role="tab"
          aria-label="Go to slide ${index + 1}"
          aria-selected="${index === 0 ? 'true' : 'false'}"
          tabindex="${index === 0 ? '0' : '-1'}"
        ></button>
      `).join('');
    }

    setInitialSlide() {
      const slide = this.slides[0];
      this.loadImageIntoLayer(this.layerA, slide).then(() => {
        this.layerA.classList.add('active');
        this.announceSlide(0);
      });
    }

    async loadImageIntoLayer(layer, slide) {
      return new Promise((resolve) => {
        const picture = document.createElement('picture');
        
        // WebP sources with srcset if available
        if (slide.webp && slide.webp.length > 0) {
          const webpSrcset = slide.webp
            .sort((a, b) => b.width - a.width)
            .map(w => `${w.src} ${w.width}w`)
            .join(', ');
          
          picture.innerHTML = `
            <source 
              type="image/webp" 
              srcset="${webpSrcset}" 
              sizes="100vw"
            >
            <img 
              src="${slide.src}" 
              alt="${slide.alt || ''}" 
              loading="eager"
              decoding="async"
              style="width: 100%; height: 100%; object-fit: cover;"
            >
          `;
        } else {
          // Fallback to original format
          picture.innerHTML = `
            <img 
              src="${slide.src}" 
              alt="${slide.alt || ''}" 
              loading="eager"
              decoding="async"
              style="width: 100%; height: 100%; object-fit: cover;"
            >
          `;
        }

        const img = picture.querySelector('img');
        
        // Decode promise for smooth transition
        img.addEventListener('load', () => {
          if (img.decode) {
            img.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
        });
        
        img.addEventListener('error', () => {
          console.warn('Failed to load image:', slide.src);
          resolve();
        });

        layer.innerHTML = '';
        layer.appendChild(picture);
      });
    }

    preloadUpcoming() {
      const indices = [];
      for (let i = 1; i <= CAROUSEL_CONFIG.preloadAhead; i++) {
        indices.push((this.currentIndex + i) % this.slides.length);
      }
      
      indices.forEach(index => {
        const slide = this.slides[index];
        if (!slide.preloaded) {
          const img = new Image();
          img.src = slide.webp?.[0]?.src || slide.src;
          slide.preloaded = true;
        }
      });
    }

    goToSlide(index) {
      if (index === this.currentIndex || index < 0 || index >= this.slides.length) {
        return;
      }

      const nextLayer = this.activeLayer === 'A' ? this.layerB : this.layerA;
      const currentLayer = this.activeLayer === 'A' ? this.layerA : this.layerB;
      const slide = this.slides[index];

      // Preload and decode before swapping
      this.loadImageIntoLayer(nextLayer, slide).then(() => {
        // Swap layers
        if (this.preferredMotion) {
          nextLayer.classList.add('entering');
        }
        
        nextLayer.classList.add('active');
        currentLayer.classList.remove('active');
        
        if (this.preferredMotion) {
          setTimeout(() => {
            nextLayer.classList.remove('entering');
          }, CAROUSEL_CONFIG.transitionDuration);
        }

        this.activeLayer = this.activeLayer === 'A' ? 'B' : 'A';
        this.currentIndex = index;
        
        this.updateIndicators();
        this.announceSlide(index);
        this.preloadUpcoming();
      });
    }

    next() {
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goToSlide(nextIndex);
    }

    prev() {
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevIndex);
    }

    updateIndicators() {
      const dots = this.indicators.querySelectorAll('.hero-carousel-dot');
      dots.forEach((dot, index) => {
        const isActive = index === this.currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        dot.setAttribute('tabindex', isActive ? '0' : '-1');
      });
    }

    announceSlide(index) {
      const slide = this.slides[index];
      const announcement = `Slide ${index + 1} of ${this.slides.length}: ${slide.alt || 'Image'}`;
      this.liveRegion.textContent = announcement;
      
      // Clear after announcement
      setTimeout(() => {
        this.liveRegion.textContent = '';
      }, 1000);
    }

    startAutoplay() {
      if (this.timer) clearInterval(this.timer);
      this.isPlaying = true;
      this.timer = setInterval(() => {
        if (this.isPlaying) {
          this.next();
        }
      }, CAROUSEL_CONFIG.interval);
    }

    stopAutoplay() {
      this.isPlaying = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    pause() {
      this.isPlaying = false;
    }

    resume() {
      this.isPlaying = true;
    }

    setupEventListeners() {
      // Navigation buttons
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoplay();
      });
      
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoplay();
      });

      // Indicator clicks
      this.indicators.addEventListener('click', (e) => {
        if (e.target.classList.contains('hero-carousel-dot')) {
          const index = parseInt(e.target.dataset.slide, 10);
          this.goToSlide(index);
          this.resetAutoplay();
        }
      });

      // Keyboard navigation
      this.container.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            this.prev();
            this.resetAutoplay();
            break;
          case 'ArrowRight':
            this.next();
            this.resetAutoplay();
            break;
          case ' ':
          case 'Enter':
            e.preventDefault();
            if (this.isPlaying) {
              this.pause();
            } else {
              this.resume();
            }
            break;
        }
      });

      // Make container focusable
      this.container.setAttribute('tabindex', '0');

      // Touch swipe support
      this.container.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.container.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });

      // Page Visibility API - pause when tab hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pause();
        } else {
          this.resume();
        }
      });

      // Pause on hover/focus for accessibility
      this.container.addEventListener('mouseenter', () => this.pause());
      this.container.addEventListener('mouseleave', () => this.resume());
      this.container.addEventListener('focusin', () => this.pause());
      this.container.addEventListener('focusout', () => this.resume());
    }

    handleSwipe() {
      const swipeThreshold = 50;
      const diff = this.touchStartX - this.touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.next(); // Swipe left -> next
        } else {
          this.prev(); // Swipe right -> prev
        }
        this.resetAutoplay();
      }
    }

    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  // Auto-initialize on DOM ready
  function initCarousels() {
    const containers = document.querySelectorAll('[data-hero-carousel]');
    containers.forEach(container => {
      if (!container._carouselInstance) {
        container._carouselInstance = new HeroCarousel(container);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }

  // Expose to global scope for manual initialization
  window.HeroCarousel = HeroCarousel;
})();
