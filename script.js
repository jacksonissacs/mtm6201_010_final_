/**
 * MTM6201 Final Project - APEX Performance Gym
 * Author: Andy
 * Description: Handles animations, smooth scrolling, form validation, and interactivity
 */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: 'mobile'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 59, 59, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Active navigation highlighting
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNav();

// Form validation and submission
const contactForms = document.querySelectorAll('.contact-form');

contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Check required fields
        const requiredName = firstName || name;
        if (!requiredName || !email || !message) {
            showAlert('Please fill in all required fields.', 'danger', form);
            return;
        }
        
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'danger', form);
            return;
        }
        
        // Success
        showAlert('Thank you for your message! We\'ll get back to you within 24 hours.', 'success', form);
        form.reset();
    });
});

// Alert function for form feedback
function showAlert(message, type, form) {
    // Remove existing alerts
    const existingAlert = form.parentNode.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-message mb-4`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert alert before form
    form.parentNode.insertBefore(alertDiv, form);
    
    // Scroll to alert
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = counter.textContent;
        
        // Skip if not a number
        if (isNaN(parseInt(target))) return;
        
        const updateCount = () => {
            const count = parseInt(counter.textContent);
            const targetNum = parseInt(target);
            const increment = targetNum / speed;
            
            if (count < targetNum) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = target;
            }
        };
        
        // Check if counter is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counter.textContent = '0';
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
if (document.querySelectorAll('.stat-number').length > 0) {
    animateCounters();
}

// Parallax effect for hero section (subtle)
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroSection.style.transform = `translateY(${parallax}px)`;
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Keyboard navigation accessibility
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

// Handle external links (open in new tab with security)
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Table responsiveness for class schedule
const scheduleTable = document.querySelector('.schedule-table');
if (scheduleTable) {
    function makeTableResponsive() {
        const tableWrapper = scheduleTable.closest('.table-responsive');
        if (window.innerWidth < 768) {
            if (!tableWrapper) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                scheduleTable.parentNode.insertBefore(wrapper, scheduleTable);
                wrapper.appendChild(scheduleTable);
            }
        }
    }
    
    makeTableResponsive();
    window.addEventListener('resize', makeTableResponsive);
}

// Lazy loading fallback for older browsers
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Performance monitoring (development only)
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// Console message
console.log('%c🏋️ APEX Performance Gym', 'font-size: 20px; font-weight: bold; color: #ff3b3b;');
console.log('%cBuilt with HTML5, CSS3, Bootstrap 5, and JavaScript', 'font-size: 14px; color: #b0b0b0;');
console.log('%cWebsite developed for MTM6201 Final Project', 'font-size: 14px; color: #b0b0b0;');

// Add smooth reveal animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for reveal animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Pricing card hover effect enhancement
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleElement = button.querySelector('.ripple');
    if (rippleElement) {
        rippleElement.remove();
    }
    
    button.appendChild(ripple);
}

// Add ripple styles dynamically
const style = document.createElement('style');
style.innerHTML = `
    .btn { position: relative; overflow: hidden; }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});
