// Microsoft Learn PowerPoint Accent Colors Interactive Guide
class StorageAccountGuide {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.setupKeyboardNavigation();
        this.preloadAnimations();
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        // Step dots navigation
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToStep(index + 1));
        });

        // Sidebar navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.addEventListener('click', () => this.goToStep(index + 1));
        });

        // Touch/swipe support
        this.setupTouchNavigation();
    }

    setupTouchNavigation() {
        let startX = null;
        let startY = null;
        const threshold = 50;

        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        mainContent.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        mainContent.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;

            // Only handle horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    this.nextStep();
                } else {
                    this.previousStep();
                }
            }

            startX = null;
            startY = null;
        }, { passive: true });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;

            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextStep();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousStep();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToStep(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToStep(this.totalSteps);
                    break;
                default:
                    // Number key navigation (1-7)
                    const num = parseInt(e.key);
                    if (num >= 1 && num <= this.totalSteps) {
                        e.preventDefault();
                        this.goToStep(num);
                    }
                    break;
            }
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps && !this.isAnimating) {
            this.goToStep(this.currentStep + 1);
        }
    }

    previousStep() {
        if (this.currentStep > 1 && !this.isAnimating) {
            this.goToStep(this.currentStep - 1);
        }
    }

    async goToStep(stepNumber) {
        if (stepNumber === this.currentStep || this.isAnimating || 
            stepNumber < 1 || stepNumber > this.totalSteps) {
            return;
        }

        this.isAnimating = true;
        
        // Hide current step
        const currentContent = document.getElementById(`content-${this.currentStep}`);
        if (currentContent) {
            currentContent.classList.remove('active');
        }

        // Update step tracking
        const previousStep = this.currentStep;
        this.currentStep = stepNumber;

        // Wait for hide animation
        await this.delay(200);

        // Show new step
        const newContent = document.getElementById(`content-${this.currentStep}`);
        if (newContent) {
            newContent.classList.add('active');
        }

        // Update all UI elements
        this.updateProgress();
        this.updateNavigation();
        this.updateSidebar();
        this.updateDots();
        
        // Trigger step-specific animations
        this.triggerStepAnimations(this.currentStep);
        
        // Mark previous steps as completed
        this.markStepsCompleted(previousStep);

        // Wait for show animation to complete
        await this.delay(400);
        
        this.isAnimating = false;
    }

    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        const progressCircle = document.getElementById('progress-circle');
        const progressNumber = document.getElementById('progress-number');
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 15.9155;
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
        
        if (progressNumber) {
            progressNumber.textContent = `${Math.round(progress)}%`;
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentStep === this.totalSteps;
            if (this.currentStep === this.totalSteps) {
                nextBtn.querySelector('.control-text').textContent = 'Complete';
            } else {
                nextBtn.querySelector('.control-text').textContent = 'Next';
            }
        }
    }

    updateSidebar() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            const stepNum = index + 1;
            item.classList.remove('active', 'completed');
            
            if (stepNum === this.currentStep) {
                item.classList.add('active');
            } else if (stepNum < this.currentStep) {
                item.classList.add('completed');
            }
        });
    }

    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            const stepNum = index + 1;
            dot.classList.remove('active', 'completed');
            
            if (stepNum === this.currentStep) {
                dot.classList.add('active');
            } else if (stepNum < this.currentStep) {
                dot.classList.add('completed');
            }
        });
    }

    markStepsCompleted(fromStep) {
        // Mark all steps before current as completed
        for (let i = 1; i < this.currentStep; i++) {
            const navItem = document.querySelector(`.nav-item[data-step="${i}"]`);
            if (navItem && !navItem.classList.contains('completed')) {
                navItem.classList.add('completed');
            }
        }
    }

    triggerStepAnimations(stepNumber) {
        // Remove any existing step-specific animations
        document.querySelectorAll('.animated').forEach(el => {
            el.classList.remove('animated');
        });

        const currentContent = document.getElementById(`content-${stepNumber}`);
        if (!currentContent) return;

        // Add step-specific animations based on content
        switch(stepNumber) {
            case 1:
                this.animateStorageAccount(currentContent);
                break;
            case 2:
                this.animatePerformanceTiers(currentContent);
                break;
            case 3:
                this.animateServicesGrid(currentContent);
                break;
            case 4:
                this.animateContainers(currentContent);
                break;
            case 5:
                this.animateBlobTypes(currentContent);
                break;
            case 6:
                this.animateAccessTiers(currentContent);
                break;
            case 7:
                this.animateArchitecture(currentContent);
                break;
        }
    }

    animateStorageAccount(container) {
        const features = container.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.animation = 'fadeInUp 0.6s ease forwards';
                feature.classList.add('animated');
            }, index * 200);
        });
    }

    animatePerformanceTiers(container) {
        const tiers = container.querySelectorAll('.tier-card');
        tiers.forEach((tier, index) => {
            setTimeout(() => {
                tier.style.animation = 'slideInUp 0.8s ease forwards';
                tier.classList.add('animated');
            }, index * 300);
        });
    }

    animateServicesGrid(container) {
        const services = container.querySelectorAll('.service-card');
        services.forEach((service, index) => {
            setTimeout(() => {
                service.style.animation = 'gridFadeIn 0.6s ease forwards';
                service.classList.add('animated');
            }, index * 150);
        });
    }

    animateContainers(container) {
        const containers = container.querySelectorAll('.container-node');
        containers.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'containerSlide 0.7s ease forwards';
                node.classList.add('animated');
            }, index * 200);
        });
    }

    animateBlobTypes(container) {
        const blobTypes = container.querySelectorAll('.blob-type-card');
        blobTypes.forEach((type, index) => {
            setTimeout(() => {
                type.style.animation = 'blobTypesFade 0.8s ease forwards';
                type.classList.add('animated');
            }, index * 250);
        });
    }

    animateAccessTiers(container) {
        const tiers = container.querySelectorAll('.tier-milestone');
        tiers.forEach((tier, index) => {
            setTimeout(() => {
                tier.style.animation = 'tiersFlow 0.9s ease forwards';
                tier.classList.add('animated');
            }, index * 200);
        });
    }

    animateArchitecture(container) {
        const rings = container.querySelectorAll('.ring');
        const center = container.querySelector('.overview-center');
        
        if (center) {
            center.style.animation = 'architectureReveal 1s ease forwards';
            center.classList.add('animated');
        }
        
        rings.forEach((ring, index) => {
            setTimeout(() => {
                ring.style.opacity = '1';
                ring.style.animation = ring.classList.contains('services') ? 
                    'ringRotate 20s linear infinite' : 
                    'ringRotate 30s linear infinite reverse';
                ring.classList.add('animated');
            }, (index + 1) * 500);
        });
    }

    preloadAnimations() {
        // Preload any animation resources or setup
        const style = document.createElement('style');
        style.textContent = `
            .step-content:not(.active) {
                pointer-events: none;
            }
            .animated {
                animation-fill-mode: both;
            }
        `;
        document.head.appendChild(style);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public methods for external control
    getCurrentStep() {
        return this.currentStep;
    }

    getTotalSteps() {
        return this.totalSteps;
    }

    isCurrentlyAnimating() {
        return this.isAnimating;
    }

    // Method to reset to first step
    reset() {
        this.goToStep(1);
    }

    // Method to jump to last step
    complete() {
        this.goToStep(this.totalSteps);
    }
}

// Initialize the guide when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.storageGuide = new StorageAccountGuide();
    
    // Add accessibility announcements
    const announceStepChange = (stepNumber) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Now viewing step ${stepNumber} of ${window.storageGuide.getTotalSteps()}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };

    // Override the goToStep method to include announcements
    const originalGoToStep = window.storageGuide.goToStep;
    window.storageGuide.goToStep = function(stepNumber) {
        originalGoToStep.call(this, stepNumber).then(() => {
            announceStepChange(stepNumber);
        });
    };
});

// Add CSS for screen readers
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(srOnlyStyle);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageAccountGuide;
}
