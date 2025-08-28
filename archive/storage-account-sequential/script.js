// Azure Storage Account Interactive Guide
class StorageAccountGuide {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.isAnimating = false;
        
        // DOM elements
        this.stepCounter = document.getElementById('step-counter');
        this.progressFill = document.getElementById('progress-fill');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.steps = document.querySelectorAll('.step');
        
        this.init();
    }
    
    init() {
        // Bind event listeners
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Initialize first step
        this.updateDisplay();
        this.addStepAnimations();
        
        // Add click handlers for interactive elements
        this.addInteractiveHandlers();
        
        console.log('Azure Storage Account Guide initialized!');
    }
    
    nextStep() {
        if (this.isAnimating || this.currentStep >= this.totalSteps) return;
        
        this.currentStep++;
        this.transitionToStep();
    }
    
    previousStep() {
        if (this.isAnimating || this.currentStep <= 1) return;
        
        this.currentStep--;
        this.transitionToStep();
    }
    
    transitionToStep() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Hide current step
        const currentStepEl = document.querySelector('.step.active');
        if (currentStepEl) {
            currentStepEl.style.opacity = '0';
            currentStepEl.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                currentStepEl.classList.remove('active');
                this.showNewStep();
            }, 300);
        } else {
            this.showNewStep();
        }
    }
    
    showNewStep() {
        const newStepEl = document.getElementById(`step-${this.currentStep}`);
        
        if (newStepEl) {
            // Reset and show new step
            newStepEl.style.opacity = '0';
            newStepEl.style.transform = 'translateX(30px)';
            newStepEl.classList.add('active');
            
            // Trigger entrance animation
            setTimeout(() => {
                newStepEl.style.opacity = '1';
                newStepEl.style.transform = 'translateX(0)';
                
                // Add specific step animations
                this.triggerStepSpecificAnimations();
                
                setTimeout(() => {
                    this.isAnimating = false;
                }, 300);
            }, 50);
        }
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update step counter
        this.stepCounter.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
        
        // Update progress bar
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        
        // Update button states
        this.prevBtn.disabled = this.currentStep === 1;
        this.nextBtn.disabled = this.currentStep === this.totalSteps;
        
        // Update button text for last step
        if (this.currentStep === this.totalSteps) {
            this.nextBtn.textContent = 'Complete!';
            this.nextBtn.style.background = 'var(--accent-green)';
        } else {
            this.nextBtn.textContent = 'Next';
            this.nextBtn.style.background = 'var(--primary-blue)';
        }
    }
    
    triggerStepSpecificAnimations() {
        const stepEl = document.getElementById(`step-${this.currentStep}`);
        
        switch(this.currentStep) {
            case 1:
                this.animateStorageAccount();
                break;
            case 2:
                this.animateTiers();
                break;
            case 3:
                this.animateServices();
                break;
            case 4:
                this.animateContainers();
                break;
            case 5:
                this.animateBlobTypes();
                break;
            case 6:
                this.animateAccessTiers();
                break;
            case 7:
                this.animateOverview();
                break;
        }
    }
    
    animateStorageAccount() {
        const cloudIcon = document.querySelector('#step-1 .cloud-icon');
        const box = document.querySelector('#step-1 .storage-account-box');
        
        if (cloudIcon && box) {
            // Animate cloud icon
            cloudIcon.style.transform = 'scale(0)';
            cloudIcon.style.transition = 'transform 0.6s ease';
            
            setTimeout(() => {
                cloudIcon.style.transform = 'scale(1)';
            }, 200);
            
            // Animate box appearance
            box.style.transform = 'rotate(1deg) scale(0.8)';
            box.style.transition = 'transform 0.6s ease';
            
            setTimeout(() => {
                box.style.transform = 'rotate(1deg) scale(1)';
            }, 400);
        }
    }
    
    animateTiers() {
        const tiers = document.querySelectorAll('#step-2 .tier');
        
        tiers.forEach((tier, index) => {
            tier.style.opacity = '0';
            tier.style.transform = 'translateY(20px) rotate(-2deg)';
            tier.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                tier.style.opacity = '1';
                tier.style.transform = index % 2 === 0 ? 'translateY(0) rotate(-2deg)' : 'translateY(0) rotate(2deg)';
            }, 300 + index * 200);
        });
    }
    
    animateServices() {
        const services = document.querySelectorAll('#step-3 .service');
        
        services.forEach((service, index) => {
            service.style.opacity = '0';
            service.style.transform = 'scale(0) rotate(-1deg)';
            service.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                service.style.opacity = '1';
                service.style.transform = 'scale(1) rotate(-1deg)';
                
                // Add bounce effect
                setTimeout(() => {
                    service.style.transform = 'scale(1.1) rotate(-1deg)';
                    setTimeout(() => {
                        service.style.transform = 'scale(1) rotate(-1deg)';
                    }, 100);
                }, 200);
            }, 200 + index * 150);
        });
    }
    
    animateContainers() {
        const containers = document.querySelectorAll('#step-4 .container-item');
        
        containers.forEach((container, index) => {
            container.style.opacity = '0';
            container.style.transform = 'translateX(-20px) rotate(-0.5deg)';
            container.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                container.style.opacity = '1';
                container.style.transform = 'translateX(0) rotate(-0.5deg)';
            }, 300 + index * 150);
        });
    }
    
    animateBlobTypes() {
        const blobTypes = document.querySelectorAll('#step-5 .blob-type');
        
        blobTypes.forEach((blobType, index) => {
            blobType.style.opacity = '0';
            blobType.style.transform = 'scale(0) rotate(-1deg)';
            blobType.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                blobType.style.opacity = '1';
                blobType.style.transform = 'scale(1) rotate(-1deg)';
            }, 400 + index * 200);
        });
    }
    
    animateAccessTiers() {
        const tierItems = document.querySelectorAll('#step-6 .tier-item');
        
        tierItems.forEach((tierItem, index) => {
            tierItem.style.opacity = '0';
            tierItem.style.transform = 'translateY(30px) rotate(-1deg)';
            tierItem.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                tierItem.style.opacity = '1';
                tierItem.style.transform = 'translateY(0) rotate(-1deg)';
                
                // Add special effect for temperature icons
                const icon = tierItem.querySelector('.tier-icon');
                if (icon) {
                    icon.style.animation = 'pulse 1s ease-in-out';
                }
            }, 200 + index * 150);
        });
    }
    
    animateOverview() {
        const overviewSections = document.querySelectorAll('#step-7 .overview-section');
        
        overviewSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'scale(0.8)';
            section.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'scale(1)';
            }, 300 + index * 100);
        });
        
        // Celebration effect
        setTimeout(() => {
            this.triggerCelebration();
        }, 1000);
    }
    
    addStepAnimations() {
        // Add CSS for pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes celebrate {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(-5deg) scale(1.1); }
                75% { transform: rotate(5deg) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    addInteractiveHandlers() {
        // Add hover effects for services
        document.addEventListener('mouseenter', (e) => {
            if (e.target.closest('.service')) {
                const service = e.target.closest('.service');
                this.showTooltip(service, this.getServiceTooltip(service));
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.closest('.service')) {
                this.hideTooltip();
            }
        }, true);
        
        // Add click effects
        document.addEventListener('click', (e) => {
            if (e.target.closest('.service, .tier, .blob-type, .tier-item')) {
                const element = e.target.closest('.service, .tier, .blob-type, .tier-item');
                this.addClickEffect(element);
            }
        });
    }
    
    getServiceTooltip(service) {
        const tooltips = {
            'blob-service': 'Store any type of unstructured data like images, videos, documents, and backups.',
            'file-service': 'Fully managed file shares that can be mounted from cloud or on-premises.',
            'queue-service': 'Reliable messaging between application components with async processing.',
            'table-service': 'NoSQL key-value store for rapid development with massive datasets.'
        };
        
        const serviceClass = Array.from(service.classList).find(cls => tooltips[cls]);
        return tooltips[serviceClass] || 'Azure Storage Service';
    }
    
    showTooltip(element, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--text-dark);
            color: var(--primary-white);
            padding: 8px 12px;
            border-radius: var(--border-radius);
            font-size: 0.9rem;
            max-width: 200px;
            z-index: 1000;
            box-shadow: var(--shadow);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
    }
    
    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    addClickEffect(element) {
        element.style.transform = element.style.transform + ' scale(0.95)';
        
        setTimeout(() => {
            element.style.transform = element.style.transform.replace(' scale(0.95)', '');
        }, 150);
    }
    
    triggerCelebration() {
        const elements = document.querySelectorAll('#step-7 .mini-service, #step-7 .mini-tier');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'celebrate 0.6s ease-in-out';
            }, index * 100);
        });
        
        // Add confetti effect
        this.createConfetti();
    }
    
    createConfetti() {
        // Use WWL brand colors for confetti
        const colors = ['var(--primary-blue)', 'var(--accent-green)', 'var(--accent-orange)', 'var(--accent-purple)'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const colorIndex = Math.floor(Math.random() * colors.length);
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[colorIndex]};
                    left: ${Math.random() * 100}vw;
                    top: -10px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: fall 3s ease-in forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
        
        // Add fall animation
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    handleKeyDown(e) {
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
        }
    }
    
    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps || this.isAnimating) return;
        
        this.currentStep = stepNumber;
        this.transitionToStep();
    }
    
    // Public method for external control
    setStep(stepNumber) {
        this.goToStep(stepNumber);
    }
    
    // Get current step for external access
    getCurrentStep() {
        return this.currentStep;
    }
}

// Initialize the guide when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.storageGuide = new StorageAccountGuide();
});

// Add some fun Easter eggs
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cloud-icon')) {
        e.target.style.animation = 'float 1s ease-in-out';
        setTimeout(() => {
            e.target.style.animation = 'float 3s ease-in-out infinite';
        }, 1000);
    }
});

// Add accessibility improvements
document.addEventListener('focus', (e) => {
    if (e.target.classList.contains('nav-btn')) {
        e.target.style.outline = '3px solid var(--accent-purple)';
        e.target.style.outlineOffset = '2px';
    }
}, true);

document.addEventListener('blur', (e) => {
    if (e.target.classList.contains('nav-btn')) {
        e.target.style.outline = 'none';
    }
}, true);

// Console API for debugging/control
console.log(`
🎉 Azure Storage Account Guide loaded!

Keyboard shortcuts:
- Arrow Right / Space: Next step
- Arrow Left: Previous step  
- Home: Go to first step
- End: Go to last step

API:
- storageGuide.setStep(n): Go to step n
- storageGuide.getCurrentStep(): Get current step
- storageGuide.nextStep(): Go to next step
- storageGuide.previousStep(): Go to previous step
`);
