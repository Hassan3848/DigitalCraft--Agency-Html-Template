 // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            const mobileToggle = document.querySelector('.mobile-toggle');
            
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        }

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200; // The lower the slower

            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stats')) {
                        animateCounters();
                    }
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.addEventListener('DOMContentLoaded', function() {
            const animatedElements = document.querySelectorAll('.stats, .service-card, .hero-content');
            animatedElements.forEach(el => observer.observe(el));
        });

        // Form submission
        function submitForm(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            const submitBtn = form.querySelector('.submit-btn');
            const successMessage = document.getElementById('successMessage');
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                successMessage.classList.add('show');
                
                // Reset button
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
                // Here you would typically send the form data to your server
                console.log('Form Data:', Object.fromEntries(formData));
                
            }, 2000);
        }

        // Add mobile menu styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .nav-links {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 100%;
                    height: 100vh;
                    background: white;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: right 0.3s ease;
                    z-index: 999;
                }
                
                .nav-links.active {
                    right: 0;
                }
                
                .nav-links li {
                    margin: 1rem 0;
                }
                
                .nav-links a {
                    font-size: 1.5rem;
                }
                
                .mobile-toggle.active span:nth-child(1) {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                
                .mobile-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-toggle.active span:nth-child(3) {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
            }
        `;
        document.head.appendChild(style);

        // Add scroll reveal effect
        function addScrollReveal() {
            const cards = document.querySelectorAll('.service-card');
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0)';
                            entry.target.style.opacity = '1';
                        }, index * 100);
                    }
                });
            }, { threshold: 0.1 });
            
            cards.forEach(card => {
                card.style.transform = 'translateY(50px)';
                card.style.opacity = '0';
                card.style.transition = 'all 0.6s ease';
                cardObserver.observe(card);
            });
        }

        // Initialize scroll reveal on DOM load
        document.addEventListener('DOMContentLoaded', addScrollReveal);

        // Add typing effect to hero title (optional enhancement)
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Enhanced form validation
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', clearError);
            });
            
            function validateField(e) {
                const field = e.target;
                const value = field.value.trim();
                
                // Remove existing error
                clearError(e);
                
                if (!value) {
                    showError(field, 'This field is required');
                } else if (field.type === 'email' && !isValidEmail(value)) {
                    showError(field, 'Please enter a valid email address');
                }
            }
            
            function showError(field, message) {
                field.style.borderColor = '#ef4444';
                
                let errorDiv = field.parentNode.querySelector('.error-message');
                if (!errorDiv) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
                    field.parentNode.appendChild(errorDiv);
                }
                errorDiv.textContent = message;
            }
            
            function clearError(e) {
                const field = e.target;
                field.style.borderColor = '';
                
                const errorDiv = field.parentNode.querySelector('.error-message');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
            
            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
        });

        // Add particles background effect (optional)
        function createParticles() {
            const hero = document.querySelector('.hero');
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'particles';
            particlesContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    animation: float ${Math.random() * 3 + 2}s linear infinite;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 2}s;
                `;
                particlesContainer.appendChild(particle);
            }
            
            hero.appendChild(particlesContainer);
        }

        // Initialize particles on load
        // createParticles(); // Uncomment if you want particles effect

        // Add loading screen (optional)
        function addLoadingScreen() {
            const loadingScreen = document.createElement('div');
            loadingScreen.id = 'loadingScreen';
            loadingScreen.innerHTML = `
                <div class="loading-content">
                    <div class="loading-logo">DigitalCraft</div>
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Creating Amazing Experiences...</div>
                </div>
            `;
            loadingScreen.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                color: white;
                text-align: center;
                transition: opacity 0.5s ease;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .loading-content {
                    text-align: center;
                }
                .loading-logo {
                    font-size: 2rem;
                    font-weight: 800;
                    margin-bottom: 2rem;
                }
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                .loading-text {
                    font-size: 1rem;
                    opacity: 0.8;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(loadingScreen);
            
            // Hide loading screen after page loads
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.remove();
                    }, 500);
                }, 1000);
            });
        }

        // Initialize loading screen
        // addLoadingScreen(); // Uncomment if you want loading screen