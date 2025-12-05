/**
 * PrimalTraining Website - JavaScript
 * MTM6201 Final Project
 */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
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
const bookingForms = document.querySelectorAll('.booking-form');

bookingForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        const email = document.getElementById('email').value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!firstName || !lastName || !email) {
            showAlert('Please fill in all required fields.', 'danger', form);
            return;
        }
        
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'danger', form);
            return;
        }
        
        showAlert('Booking request submitted successfully! We\'ll contact you soon.', 'success', form);
        form.reset();
    });
});

// Alert function
function showAlert(message, type, form) {
    const existingAlert = form.parentNode.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-message mb-4`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    form.parentNode.insertBefore(alertDiv, form);
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
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
        
        if (isNaN(parseInt(target))) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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
                    
                    counter.textContent = '0';
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

if (document.querySelectorAll('.stat-number').length > 0) {
    animateCounters();
}

// Handle external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

console.log('%cPrimalTraining Website', 'font-size: 20px; font-weight: bold; color: #6B6BFF;');
console.log('%cBuilt with HTML5, CSS3, Bootstrap 5, and JavaScript', 'font-size: 14px; color: #404040;');
