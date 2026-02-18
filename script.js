// ========================================
// ATHLETIQ - Football Injury Detection AI
// Main JavaScript File
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // ========================================
    // NAVIGATION
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(7px)' : 'rotate(0)';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-7px)' : 'rotate(0)';
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                navMenu.classList.remove('active');
                
                const offset = 80;
                const targetPosition = targetSection.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
    
    
    // ========================================
    // STATISTICS COUNTER ANIMATION
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            
            if (text.includes('%')) {
                const target = parseInt(text);
                animateCounter(stat, 0, target, 2000, '%');
            } else if (text.includes('+')) {
                const target = parseInt(text);
                animateCounter(stat, 0, target, 2000, '+');
            } else if (text.includes('<')) {
                stat.textContent = '<1s';
            } else if (text.includes('/')) {
                stat.textContent = '24/7';
            }
        });
        
        statsAnimated = true;
    }
    
    function animateCounter(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(heroSection);
    }
    
    
    // ========================================
    // DEMO SECTION INTERACTIONS
    // ========================================
    const demoSlider = document.querySelector('.demo-slider');
    const sliderValue = document.querySelector('.slider-value');
    
    if (demoSlider && sliderValue) {
        demoSlider.addEventListener('input', function() {
            sliderValue.textContent = this.value + '%';
        });
    }
    
    const videoUpload = document.getElementById('videoUpload');
    if (videoUpload) {
        videoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileName = file.name;
                const uploadBtn = document.querySelector('.upload-btn');
                if (uploadBtn) {
                    uploadBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${fileName}`;
                    uploadBtn.style.background = '#00a859';
                }
                showNotification('Video uploaded successfully!', 'success');
            }
        });
    }
    
    const analyzeBtn = document.querySelector('.demo-controls .btn-primary');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const button = this;
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check-circle"></i> Analysis Complete';
                button.style.background = '#00a859';
                
                animateResults();
                showNotification('Analysis completed successfully!', 'success');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 2000);
            }, 3000);
        });
    }
    
    function animateResults() {
        const resultFill = document.querySelector('.result-fill');
        if (resultFill) {
            resultFill.style.width = '0%';
            setTimeout(() => {
                resultFill.style.width = '65%';
            }, 100);
        }
        
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 500 + (index * 200));
        });
    }
    
    
    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
                submitBtn.style.background = '#00a859';
                
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 2000);
        });
    }
    
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const animatedElements = document.querySelectorAll('.feature-card, .tech-card, .about-text, .about-image');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    
    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#00a859' : '#0d1117'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    
    // ========================================
    // PARALLAX EFFECT
    // ========================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroOverlay = document.querySelector('.hero-overlay');
        
        if (heroOverlay) {
            heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    
    // ========================================
    // FEATURE CARD HOVER EFFECTS
    // ========================================
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    
    // ========================================
    // INITIALIZE PAGE
    // ========================================
    console.log('ATHLETIQ - Football Injury Detection AI Initialized');
    console.log('System Status: Operational');
    console.log('AI Models: Loaded');
    console.log('Ready for injury detection analysis');

}); // End of DOMContentLoaded
