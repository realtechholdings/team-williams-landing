// ============================================
// Team Williams RE/MAX Regency - JavaScript
// Dynamic Listings & RE/MAX Branding
// ============================================

// Configuration
const CONFIG = {
    agentId: 'ben-williams-2115806',
    realEstateComAuAgentUrl: 'https://www.realestate.com.au/agent/ben-williams-2115806',
    remaxGcUrl: 'https://www.remaxgc.com.au',
    listingsRefreshInterval: 300000 // 5 minutes
};

// ============================================
// Dynamic Listings System
// ============================================

// Sample listings data (replace with API call in production)
// This structure matches realestate.com.au API response format
const sampleListings = [
    {
        id: '1',
        address: '15 Coral Street, Burleigh Heads',
        suburb: 'Burleigh Heads',
        state: 'QLD',
        postcode: '4220',
        price: '$1,850,000',
        priceType: 'sale',
        beds: 4,
        baths: 3,
        cars: 2,
        landSize: 450,
        listingType: 'sale',
        status: 'available',
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
        description: 'Stunning beachside home with ocean views',
        agent: 'Ben Williams'
    },
    {
        id: '2',
        address: '42 The Peninsula, Hope Island',
        suburb: 'Hope Island',
        state: 'QLD',
        postcode: '4212',
        price: '$1,750,000',
        priceType: 'sale',
        beds: 4,
        baths: 3,
        cars: 2,
        landSize: 380,
        listingType: 'sale',
        status: 'available',
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
        description: 'Luxury waterfront villa with private pontoon',
        agent: 'Ben Williams'
    },
    {
        id: '3',
        address: '78 Highland Avenue, Mermaid Beach',
        suburb: 'Mermaid Beach',
        state: 'QLD',
        postcode: '4218',
        price: '$1,450,000',
        priceType: 'sale',
        beds: 3,
        baths: 2,
        cars: 2,
        landSize: 280,
        listingType: 'sale',
        status: 'available',
        images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
        description: 'Modern townhouse in premium location',
        agent: 'Ben Williams'
    },
    {
        id: '4',
        address: 'PH1/1 Oracle Boulevard, Broadbeach',
        suburb: 'Broadbeach',
        state: 'QLD',
        postcode: '4218',
        price: '$3,200,000',
        priceType: 'sale',
        beds: 3,
        baths: 3,
        cars: 2,
        landSize: 280,
        listingType: 'sale',
        status: 'available',
        images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80'],
        description: 'Spectacular penthouse with 360° views',
        agent: 'Ben Williams'
    },
    {
        id: '5',
        address: '45/320 Marine Parade, Surfers Paradise',
        suburb: 'Surfers Paradise',
        state: 'QLD',
        postcode: '4217',
        price: '$895,000',
        priceType: 'sale',
        beds: 2,
        baths: 2,
        cars: 1,
        landSize: 120,
        listingType: 'sale',
        status: 'available',
        images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'],
        description: 'Beachside apartment with ocean views',
        agent: 'Ben Williams'
    },
    {
        id: '6',
        address: '123 Pacific Parade, Broadbeach',
        suburb: 'Broadbeach',
        state: 'QLD',
        postcode: '4218',
        price: '$2,850,000',
        priceType: 'sale',
        beds: 5,
        baths: 4,
        cars: 3,
        landSize: 450,
        listingType: 'sale',
        status: 'available',
        images: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'],
        description: 'Luxury waterfront estate with private beach access',
        agent: 'Ben Williams'
    }
];

// Function to create property card HTML
function createPropertyCard(property) {
    const priceDisplay = property.priceType === 'rent' 
        ? `${property.price}/week` 
        : property.price;
    
    const statusBadge = property.status === 'sold' 
        ? '<span class="property-badge sold">Sold</span>'
        : property.listingType === 'rent'
            ? '<span class="property-badge rent">For Rent</span>'
            : '<span class="property-badge sale">For Sale</span>';

    const imageUrl = property.images && property.images[0] 
        ? property.images[0] 
        : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

    return `
        <div class="property-card" data-category="${property.listingType}">
            <div class="property-image">
                <img src="${imageUrl}" alt="${property.address}" loading="lazy">
                ${statusBadge}
            </div>
            <div class="property-details">
                <h3>${property.address}</h3>
                <p class="property-address">
                    <i class="fas fa-map-marker-alt"></i> 
                    ${property.suburb}, ${property.state} ${property.postcode}
                </p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.beds} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.baths} Baths</span>
                    <span><i class="fas fa-car"></i> ${property.cars} Car</span>
                    ${property.landSize ? `<span><i class="fas fa-ruler-combined"></i> ${property.landSize}m²</span>` : ''}
                </div>
                <div class="property-price">${priceDisplay}</div>
                <a href="${CONFIG.realEstateComAuAgentUrl}" target="_blank" class="btn btn-outline btn-small">View Details</a>
            </div>
        </div>
    `;
}

// Function to load listings
async function loadListings() {
    const propertiesGrid = document.querySelector('.properties-grid');
    if (!propertiesGrid) return;

    // Show loading state
    propertiesGrid.innerHTML = '<div class="loading-listings"><i class="fas fa-spinner fa-spin"></i><p>Loading listings...</p></div>';

    try {
        // In production, replace this with actual API call
        // const response = await fetch(`/api/listings?agent=${CONFIG.agentId}`);
        // const listings = await response.json();
        
        // Using sample data for now
        const listings = sampleListings;
        
        if (listings && listings.length > 0) {
            propertiesGrid.innerHTML = listings.map(createPropertyCard).join('');
            
            // Re-initialize property filters for new cards
            initializePropertyFilters();
        } else {
            propertiesGrid.innerHTML = '<p class="no-listings">No current listings available. <a href="#contact">Contact us</a> for a free appraisal.</p>';
        }
    } catch (error) {
        console.error('Error loading listings:', error);
        propertiesGrid.innerHTML = '<p class="no-listings">Unable to load listings. <a href="#contact">Contact us</a> for current properties.</p>';
    }
}

// Initialize property filters
function initializePropertyFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            propertyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Function to animate stats counters
function initializeStatsCounters() {
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach((stat) => {
        const endValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        let startValue = 0;
        let increment = Math.ceil(endValue / 50);
        let timer = setInterval(() => {
            startValue += increment;
            if (startValue >= endValue) {
                startValue = endValue;
                clearInterval(timer);
            }
            stat.textContent = stat.textContent.includes('$') ? `$${startValue.toLocaleString()}+` : `${startValue.toLocaleString()}+`;
        }, 50);
    });
}

// ============================================
// Main Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize stats counters
    initializeStatsCounters();
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });

    // Initialize property filters
    initializePropertyFilters();

    // Load dynamic listings
    loadListings();
    
    // Auto-refresh listings every 5 minutes
    setInterval(loadListings, CONFIG.listingsRefreshInterval);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize stats counters (already called at the start)
    
    // Contact Form Submission via Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Thank you! Your message has been sent. We will contact you shortly.');
                    this.reset();
                } else {
                    alert('There was a problem sending your message. Please try again or call us directly.');
                }
            } catch (error) {
                alert('There was a problem sending your message. Please try again or call us directly.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.property-card, .team-card, .testimonial-card, .about-feature, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .loading-listings {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: var(--text-light);
        }
        .loading-listings i {
            font-size: 40px;
            color: var(--remax-red);
            margin-bottom: 20px;
        }
        .loading-listings p {
            font-size: 16px;
        }
        .no-listings {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: var(--text-light);
            font-size: 16px;
        }
        .no-listings a {
            color: var(--remax-red);
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);

    // Staggered animation delays
    const propertyCardsAnimated = document.querySelectorAll('.property-card');
    propertyCardsAnimated.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Phone number click tracking (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone number clicked:', this.href);
            // In production, send to analytics
            // gtag('event', 'phone_click', {
            //     'event_category': 'contact',
            //     'event_label': 'header_phone'
            // });
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Testimonials Carousel
    const carousel = document.querySelector('.testimonials-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel && prevBtn && nextBtn) {
        // Get card width dynamically (handles mobile vs desktop)
        const getCardWidth = () => {
            const card = carousel.querySelector('.testimonial-card');
            if (card) {
                const style = window.getComputedStyle(carousel);
                const gap = parseInt(style.gap) || 30;
                return card.offsetWidth + gap;
            }
            return 380; // default: 350 + 30
        };
        
        let currentIndex = 0;
        
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function scrollToCard(index) {
            const cardWidth = getCardWidth();
            carousel.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots();
        }
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const maxIndex = carousel.children.length - 1;
            if (currentIndex < maxIndex) {
                scrollToCard(currentIndex + 1);
            }
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToCard(index);
            });
        });
        
        // Update current index on scroll
        carousel.addEventListener('scroll', () => {
            const cardWidth = getCardWidth();
            const newIndex = Math.round(carousel.scrollLeft / cardWidth);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < carousel.children.length) {
                currentIndex = newIndex;
                updateDots();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            scrollToCard(currentIndex);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < carousel.children.length - 1) {
                scrollToCard(currentIndex + 1);
            }
        });
    }

    console.log('Team Williams RE/MAX Regency - Website Loaded');
});