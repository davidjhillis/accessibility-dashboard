// Animations and visual effects for the accessibility dashboard
class DashboardAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initCountUpAnimations();
        this.initHoverEffects();
        this.initProgressBarAnimations();
        this.initParallaxEffects();
    }

    initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Special handling for different elements
                        if (entry.target.classList.contains('stat-card')) {
                            this.animateStatCard(entry.target);
                        }
                        
                        if (entry.target.classList.contains('violation-card')) {
                            this.animateViolationCard(entry.target);
                        }
                    }
                });
            }, this.observerOptions);

            // Observe elements that should animate on scroll
            document.querySelectorAll('.stat-card, .violation-card, .ai-insights').forEach(el => {
                observer.observe(el);
            });
        }
    }

    initCountUpAnimations() {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(element => {
            const finalValue = element.textContent.replace(/[^\d]/g, '');
            if (finalValue && !isNaN(finalValue)) {
                element.textContent = '0';
                
                setTimeout(() => {
                    this.countUp(element, 0, parseInt(finalValue), element.textContent.includes('%') ? '%' : '');
                }, 500);
            }
        });
    }

    countUp(element, start, end, suffix = '') {
        const duration = 1500;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    initHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.stat-card, .violation-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverGlow(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverGlow(card);
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.addButtonHover(btn);
            });
            
            btn.addEventListener('mouseleave', () => {
                this.removeButtonHover(btn);
            });
        });
    }

    addHoverGlow(element) {
        element.style.transition = 'all 0.3s ease';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)';
        
        // Add subtle scale
        element.style.transform = 'translateY(-4px) scale(1.02)';
    }

    removeHoverGlow(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }

    addButtonHover(button) {
        if (!button.disabled) {
            button.style.transition = 'all 0.2s ease';
            button.style.transform = 'translateY(-2px)';
            
            // Add ripple effect
            this.createRipple(button);
        }
    }

    removeButtonHover(button) {
        if (!button.disabled) {
            button.style.transform = '';
        }
    }

    createRipple(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = -size / 2 + 'px';
        ripple.style.marginTop = -size / 2 + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initProgressBarAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const animateProgress = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-progress') + '%';
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                        
                        // Add pulse effect when complete
                        setTimeout(() => {
                            progressBar.style.animation = 'pulse-progress 0.5s ease-in-out';
                        }, 1000);
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        };
        
        if ('IntersectionObserver' in window) {
            const progressObserver = new IntersectionObserver(animateProgress, {
                threshold: 0.5
            });
            
            progressBars.forEach(bar => {
                progressObserver.observe(bar);
            });
        }
    }

    initParallaxEffects() {
        // Subtle parallax effect for AI insights background
        const aiInsights = document.querySelector('.ai-insights');
        if (aiInsights) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                aiInsights.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    animateStatCard(card) {
        // Stagger animation for stat card elements
        const elements = card.querySelectorAll('.stat-title, .stat-value, .stat-description, .stat-trend');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.4s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateViolationCard(card) {
        // Slide in from right
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100);
    }

    // Utility method to create floating elements
    createFloatingElements() {
        const container = document.querySelector('.ai-insights');
        if (!container) return;
        
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'floating-dot';
            dot.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            container.appendChild(dot);
        }
    }

    // Method to trigger success celebration
    triggerSuccessAnimation() {
        this.createConfetti();
        this.pulseSuccessCards();
    }

    createConfetti() {
        const colors = ['#059669', '#10b981', '#34d399', '#6ee7b7'];
        const container = document.body;
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                animation: confetti-fall 3s linear infinite;
                animation-delay: ${Math.random() * 3}s;
                border-radius: 50%;
                z-index: 1000;
            `;
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    pulseSuccessCards() {
        document.querySelectorAll('.stat-card.success').forEach(card => {
            card.style.animation = 'pulse-success 0.6s ease-in-out';
            
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    }

    // Method to handle loading states
    showLoadingState(element) {
        element.classList.add('loading-state');
        element.style.opacity = '0.6';
        element.style.transform = 'scale(0.98)';
        element.style.filter = 'blur(1px)';
        element.style.transition = 'all 0.3s ease';
    }

    hideLoadingState(element) {
        element.classList.remove('loading-state');
        element.style.opacity = '';
        element.style.transform = '';
        element.style.filter = '';
    }

    // Toast animation
    animateToast(toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            toast.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
    }
}

// Add CSS animations dynamically
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); }
        }
        
        @keyframes pulse-progress {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(1.1); }
            100% { transform: scaleY(1); }
        }
        
        @keyframes pulse-success {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading-state::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: loading-shimmer 1.5s infinite;
        }
        
        @keyframes loading-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    
    document.head.appendChild(style);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    new DashboardAnimations();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardAnimations;
} 