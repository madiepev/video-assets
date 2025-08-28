// K-Means Clustering Phases Interactive Visualization
class ClusteringPhasesVisualization {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.isPlaying = true;
        this.animationSpeed = 3000; // 3 seconds per step
        this.animationTimer = null;
        
        // Step information with detailed descriptions
        this.stepInfo = {
            1: {
                title: "Initial Data Points",
                description: "Display unclustered data points scattered across the coordinate space, waiting to be grouped into meaningful clusters."
            },
            2: {
                title: "Initialize Centroids",
                description: "Randomly place k centroids (cluster centers) in the data space. These will serve as initial cluster centers."
            },
            3: {
                title: "Assign Points to Clusters",
                description: "Each data point is assigned to the nearest centroid based on Euclidean distance, forming initial clusters."
            },
            4: {
                title: "Update Centroid Positions",
                description: "Move each centroid to the center (mean) of all points assigned to its cluster."
            },
            5: {
                title: "Reassign Points",
                description: "Reassign data points to the nearest centroid based on updated positions. Some points may change clusters."
            },
            6: {
                title: "Convergence Achieved",
                description: "The algorithm converges when centroids stop moving significantly and cluster assignments stabilize."
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.startAnimation();
    }
    
    setupEventListeners() {
        // Control buttons
        document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('prevBtn').addEventListener('click', () => this.previousStep());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        
        // Progress dots for direct navigation
        const progressDots = document.querySelectorAll('.progress-dot');
        progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToStep(index + 1));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleKeyboard(event) {
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this.previousStep();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.nextStep();
                break;
            case ' ':
                event.preventDefault();
                this.togglePlayPause();
                break;
            case 'Home':
                event.preventDefault();
                this.reset();
                break;
        }
    }
    
    handleResize() {
        // Ensure image responsiveness
        const image = document.getElementById('clusterImage');
        if (image) {
            image.style.maxHeight = Math.min(500, window.innerHeight * 0.5) + 'px';
        }
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playPauseIcon = document.getElementById('playPauseIcon');
        
        if (this.isPlaying) {
            playPauseBtn.innerHTML = '<span id="playPauseIcon">⏸️</span> Pause';
            this.startAnimation();
        } else {
            playPauseBtn.innerHTML = '<span id="playPauseIcon">▶️</span> Play';
            this.stopAnimation();
        }
    }
    
    startAnimation() {
        if (!this.isPlaying) return;
        
        this.animationTimer = setInterval(() => {
            if (this.currentStep < this.totalSteps) {
                this.nextStep();
            } else {
                this.stopAnimation();
                // Auto-reset after completion
                setTimeout(() => {
                    if (this.isPlaying) {
                        this.reset();
                        this.startAnimation();
                    }
                }, 2000);
            }
        }, this.animationSpeed);
    }
    
    stopAnimation() {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateDisplay();
            this.addStepAnimation();
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateDisplay();
            this.addStepAnimation();
        }
    }
    
    goToStep(step) {
        if (step >= 1 && step <= this.totalSteps && step !== this.currentStep) {
            this.currentStep = step;
            this.updateDisplay();
            this.addStepAnimation();
            
            // Pause auto-play when user manually navigates
            if (this.isPlaying) {
                this.togglePlayPause();
            }
        }
    }
    
    reset() {
        this.currentStep = 1;
        this.updateDisplay();
        this.addStepAnimation();
    }
    
    updateDisplay() {
        // Update image
        const image = document.getElementById('clusterImage');
        image.src = `images/clustering-${this.currentStep}.png`;
        image.alt = `Clustering Phase ${this.currentStep}`;
        
        // Update step counter
        document.getElementById('stepCounter').textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
        
        // Update step information
        const stepInfo = this.stepInfo[this.currentStep];
        document.getElementById('stepTitle').textContent = stepInfo.title;
        document.getElementById('stepDescription').textContent = stepInfo.description;
        
        // Update progress bar - stop at each dot instead of halfway
        const progressPercentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
        
        // Update progress dots
        this.updateProgressDots();
        
        // Update control buttons
        this.updateControlButtons();
    }
    
    updateProgressDots() {
        const progressDots = document.querySelectorAll('.progress-dot');
        progressDots.forEach((dot, index) => {
            const step = index + 1;
            dot.classList.remove('active', 'completed');
            
            if (step === this.currentStep) {
                dot.classList.add('active');
            } else if (step < this.currentStep) {
                dot.classList.add('completed');
            }
        });
    }
    
    updateControlButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Enable/disable previous button
        prevBtn.disabled = this.currentStep === 1;
        
        // Enable/disable next button
        nextBtn.disabled = this.currentStep === this.totalSteps;
    }
    
    addStepAnimation() {
        // Add animation classes to elements for smooth transitions
        const image = document.getElementById('clusterImage');
        const stepInfoPanel = document.querySelector('.step-info-panel');
        
        // Remove existing animation classes
        image.classList.remove('fade-in');
        stepInfoPanel.classList.remove('slide-in');
        
        // Force reflow
        void image.offsetWidth;
        void stepInfoPanel.offsetWidth;
        
        // Add animation classes
        image.classList.add('fade-in');
        stepInfoPanel.classList.add('slide-in');
    }
    
    // Public method to get current state
    getCurrentState() {
        return {
            currentStep: this.currentStep,
            totalSteps: this.totalSteps,
            isPlaying: this.isPlaying,
            stepInfo: this.stepInfo[this.currentStep]
        };
    }
    
    // Public method to set animation speed
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
        if (this.isPlaying) {
            this.stopAnimation();
            this.startAnimation();
        }
    }
}

// Initialize the visualization when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const visualization = new ClusteringPhasesVisualization();
    
    // Make it globally accessible for debugging
    window.clusteringViz = visualization;
    
    // Add accessibility features
    addAccessibilityFeatures();
});

// Accessibility enhancements
function addAccessibilityFeatures() {
    // Add ARIA labels and roles
    const image = document.getElementById('clusterImage');
    image.setAttribute('role', 'img');
    image.setAttribute('aria-live', 'polite');
    
    const progressBar = document.querySelector('.progress-bar');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuemin', '1');
    progressBar.setAttribute('aria-valuemax', '6');
    progressBar.setAttribute('aria-valuenow', '1');
    
    // Add keyboard instructions
    const infoPanel = document.querySelector('.info-panel');
    const keyboardInstructions = document.createElement('div');
    keyboardInstructions.className = 'keyboard-instructions';
    keyboardInstructions.style.marginTop = '15px';
    keyboardInstructions.style.fontSize = '0.9rem';
    keyboardInstructions.style.color = 'var(--text-light)';
    keyboardInstructions.innerHTML = `
        <strong>Keyboard shortcuts:</strong> 
        Left/Right arrows to navigate, Spacebar to play/pause, Home to reset
    `;
    infoPanel.appendChild(keyboardInstructions);
}

// Error handling for image loading
document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('clusterImage');
    
    image.addEventListener('error', () => {
        console.error('Failed to load clustering image');
        image.alt = 'Image failed to load';
        image.style.background = '#f0f0f0';
        image.style.display = 'flex';
        image.style.alignItems = 'center';
        image.style.justifyContent = 'center';
        image.style.minHeight = '300px';
        image.style.color = '#666';
        image.textContent = 'Image not available';
    });
    
    image.addEventListener('load', () => {
        image.style.background = 'none';
        image.textContent = '';
    });
});
