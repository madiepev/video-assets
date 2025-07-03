class TemperatureIceCreamAnimation {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 7;
        this.isPlaying = false;
        this.playInterval = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        // Get all DOM elements
        this.stepText = document.getElementById('step-text');
        this.progressBar = document.getElementById('progress-bar');
        this.prevBtn = document.getElementById('prev-btn');
        this.playBtn = document.getElementById('play-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.resetBtn = document.getElementById('reset-btn');
        
        this.dataRows = document.querySelectorAll('.data-row');
        this.dataPoints = document.querySelectorAll('.data-point');
        
        // Ensure all elements start hidden
        this.reset();
    }
    
    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.previous());
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.nextBtn.addEventListener('click', () => this.next());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previous();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    this.reset();
                    break;
            }
        });
    }
    
    updateDisplay() {
        // Update step counter
        this.stepText.textContent = `Step ${this.currentStep} / ${this.totalSteps}`;
        
        // Update progress bar
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        this.progressBar.style.width = `${progressPercentage}%`;
        
        // Update button states
        this.prevBtn.disabled = this.currentStep === 0;
        this.nextBtn.disabled = this.currentStep === this.totalSteps;
        
        // Update play button text
        this.playBtn.textContent = this.isPlaying ? 'Pause' : 'Play';
        
        // Show/hide elements based on current step
        this.updateVisibleElements();
    }
    
    updateVisibleElements() {
        // Reset all elements first
        this.dataRows.forEach(row => {
            row.classList.remove('revealed');
        });
        this.dataPoints.forEach(point => {
            point.classList.remove('revealed');
        });
        
        // Show elements up to current step
        for (let i = 0; i < this.currentStep; i++) {
            if (this.dataRows[i]) {
                this.dataRows[i].classList.add('revealed');
            }
            if (this.dataPoints[i]) {
                this.dataPoints[i].classList.add('revealed');
            }
        }
    }
    
    next() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateDisplay();
            
            // Add a slight delay for the animation effect
            if (this.currentStep > 0) {
                const currentIndex = this.currentStep - 1;
                
                // Animate table row first
                setTimeout(() => {
                    if (this.dataRows[currentIndex]) {
                        this.dataRows[currentIndex].classList.add('revealed');
                    }
                }, 100);
                
                // Animate graph point with a subtle delay for elegance
                setTimeout(() => {
                    if (this.dataPoints[currentIndex]) {
                        this.dataPoints[currentIndex].classList.add('revealed');
                    }
                }, 300); // Reduced delay for smoother flow
            }
        }
        
        // Stop playing if we've reached the end
        if (this.currentStep === this.totalSteps) {
            this.stopPlay();
        }
    }
    
    previous() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateDisplay();
        }
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.stopPlay();
        } else {
            this.startPlay();
        }
    }
    
    startPlay() {
        if (this.currentStep >= this.totalSteps) {
            this.reset();
        }
        
        this.isPlaying = true;
        this.updateDisplay();
        
        this.playInterval = setInterval(() => {
            this.next();
            
            if (this.currentStep >= this.totalSteps) {
                this.stopPlay();
            }
        }, 1500); // Reduced to 1.5 seconds for smoother pacing
    }
    
    stopPlay() {
        this.isPlaying = false;
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
        this.updateDisplay();
    }
    
    reset() {
        this.stopPlay();
        this.currentStep = 0;
        
        // Remove revealed classes
        this.dataRows.forEach(row => {
            row.classList.remove('revealed');
        });
        this.dataPoints.forEach(point => {
            point.classList.remove('revealed');
        });
        
        this.updateDisplay();
    }
    
    // Method to manually set step (useful for testing)
    setStep(step) {
        if (step >= 0 && step <= this.totalSteps) {
            this.currentStep = step;
            this.updateDisplay();
        }
    }
}

// Initialize the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const animation = new TemperatureIceCreamAnimation();
    
    // Make it available globally for debugging
    window.temperatureAnimation = animation;
    
    // Add some interactive features
    const dataPoints = document.querySelectorAll('.data-point');
    dataPoints.forEach((point, index) => {
        point.addEventListener('click', () => {
            // Jump to this step when clicking on a point
            if (point.classList.contains('revealed')) {
                animation.setStep(index + 1);
            }
        });
    });
    
    // Add click handlers to table rows
    const dataRows = document.querySelectorAll('.data-row');
    dataRows.forEach((row, index) => {
        row.addEventListener('click', () => {
            // Jump to this step when clicking on a row
            if (row.classList.contains('revealed')) {
                animation.setStep(index + 1);
            }
        });
    });
});

// Add some utility functions for enhanced interactivity
function addHoverEffects() {
    // Hover effects removed per user request
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', addHoverEffects);
