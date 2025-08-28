// Minimal Azure Storage Account Guide
class MinimalStorageGuide {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        
        this.currentSpan = document.getElementById('current');
        this.progressBar = document.getElementById('progress');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.steps = document.querySelectorAll('.step');
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousStep();
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextStep();
            }
        });
        
        this.updateDisplay();
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.transitionToStep();
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.transitionToStep();
        }
    }
    
    transitionToStep() {
        // Hide current step
        const currentStepEl = document.querySelector('.step.active');
        if (currentStepEl) {
            currentStepEl.style.opacity = '0';
            currentStepEl.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentStepEl.classList.remove('active');
                this.showNewStep();
            }, 250);
        }
    }
    
    showNewStep() {
        const newStepEl = document.getElementById(`step-${this.currentStep}`);
        if (newStepEl) {
            newStepEl.classList.add('active');
            
            setTimeout(() => {
                newStepEl.style.opacity = '1';
                newStepEl.style.transform = 'translateY(0)';
            }, 50);
        }
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.currentSpan.textContent = this.currentStep;
        
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        this.progressBar.style.width = `${progressPercentage}%`;
        
        this.prevBtn.disabled = this.currentStep === 1;
        this.nextBtn.disabled = this.currentStep === this.totalSteps;
        
        if (this.currentStep === this.totalSteps) {
            this.nextBtn.textContent = 'Complete';
        } else {
            this.nextBtn.textContent = 'Next →';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MinimalStorageGuide();
});
