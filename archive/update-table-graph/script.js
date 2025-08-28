class TemperatureIceCreamAnimation {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 11;
        this.isPlaying = false;
        this.playInterval = null;
        
        // Data points for regression calculation
        this.dataPoints = [
            { temp: 21, icecream: 93 },
            { temp: 17, icecream: 87 },
            { temp: 11, icecream: 56 },
            { temp: 26, icecream: 102 },
            { temp: 22, icecream: 103 },
            { temp: 19, icecream: 101 },
            { temp: 31, icecream: 127 }
        ];
        
        this.initializeElements();
        this.calculateRegressionLine();
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
        this.dataPointElements = document.querySelectorAll('.data-point');
        this.regressionLine = document.getElementById('regression-line');
        this.formulaText = document.getElementById('formula-text');
        this.introContainer = document.getElementById('intro-container');
        this.mainContainer = document.getElementById('main-container');
        
        // Ensure all elements start hidden
        this.reset();
    }
    
    calculateRegressionLine() {
        // Create a trend line that passes through the data points and extends beyond them
        // Based on the current dot positions, create a line that fits well through them
        
        // SVG viewBox: 0-600 width, 0-500 height
        // Chart area: x: 60-540, y: 60-420
        
        // Current dot positions (approximately):
        // Point 2 (leftmost): cx="146" cy="295" 
        // Point 6 (rightmost): cx="415" cy="140"
        // Extend the line beyond these points for better visual effect
        
        const x1 = 110;  // Start well before the leftmost point
        const y1 = 320;  // Start below the leftmost point
        const x2 = 460;  // End well after the rightmost point  
        const y2 = 110;  // End above the rightmost point
        
        // Update the trend line coordinates
        this.regressionLine.setAttribute('x1', x1);
        this.regressionLine.setAttribute('y1', y1);
        this.regressionLine.setAttribute('x2', x2);
        this.regressionLine.setAttribute('y2', y2);
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
        // Handle layout switching
        if (this.currentStep === 0) {
            // Show intro layout only
            this.introContainer.classList.add('active');
            this.mainContainer.style.display = 'none';
            return; // Exit early for intro step
        } else {
            // Show main layout for all other steps
            this.introContainer.classList.remove('active');
            this.mainContainer.style.display = 'flex';
        }
        
        // Reset all elements first
        this.dataRows.forEach(row => {
            row.classList.remove('revealed');
        });
        this.dataPointElements.forEach(point => {
            point.classList.remove('revealed');
        });
        this.regressionLine.classList.remove('revealed');
        this.formulaText.classList.remove('revealed');
        
        // Handle step 1 (table drawing animation only, no graph)
        if (this.currentStep === 1) {
            this.mainContainer.classList.add('table-only');
            return; // Exit early for table drawing step
        } else {
            this.mainContainer.classList.remove('table-only');
        }
        
        // Show data elements for steps 2-9 (data points)
        for (let i = 2; i <= this.currentStep && i <= 9; i++) {
            const dataIndex = i - 2; // Convert to 0-based index for data arrays
            if (this.dataRows[dataIndex]) {
                this.dataRows[dataIndex].classList.add('revealed');
            }
            if (this.dataPointElements[dataIndex]) {
                this.dataPointElements[dataIndex].classList.add('revealed');
            }
        }
        
        // Show regression line on step 10
        if (this.currentStep >= 10) {
            this.regressionLine.classList.add('revealed');
        }
        
        // Show formula on step 11
        if (this.currentStep === 11) {
            this.formulaText.classList.add('revealed');
        }
    }
    
    next() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateDisplay();
            
            // Handle step 1 (table drawing animation)
            if (this.currentStep === 1) {
                this.animateTableDrawing();
                return;
            }
            
            // Handle steps 2-9 (data points)
            if (this.currentStep >= 2 && this.currentStep <= 9) {
                const currentIndex = this.currentStep - 2; // Convert to 0-based index
                
                // Animate table row first
                setTimeout(() => {
                    if (this.dataRows[currentIndex]) {
                        this.dataRows[currentIndex].classList.add('revealed');
                    }
                }, 100);
                
                // Animate graph point with a subtle delay for elegance
                setTimeout(() => {
                    if (this.dataPointElements[currentIndex]) {
                        this.dataPointElements[currentIndex].classList.add('revealed');
                    }
                }, 300);
            }
            
            // Handle step 10 (regression line)
            if (this.currentStep === 10) {
                setTimeout(() => {
                    this.regressionLine.classList.add('revealed');
                }, 200);
            }
            
            // Handle step 11 (formula)
            if (this.currentStep === 11) {
                setTimeout(() => {
                    this.formulaText.classList.add('revealed');
                }, 200);
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
        }, 2000); // Increased to 2 seconds for slower pacing
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
        
        // Reset layout to intro
        this.introContainer.classList.add('active');
        this.introContainer.classList.remove('morphing');
        this.mainContainer.style.display = 'none';
        this.mainContainer.classList.remove('morphing-in');
        
        // Remove revealed classes
        this.dataRows.forEach(row => {
            row.classList.remove('revealed');
        });
        this.dataPointElements.forEach(point => {
            point.classList.remove('revealed');
        });
        this.regressionLine.classList.remove('revealed');
        this.formulaText.classList.remove('revealed');
        
        this.updateDisplay();
    }
    
    animateTableDrawing() {
        // Add drawing animation class to the table container
        const tableContainer = document.querySelector('.table-container');
        const table = document.getElementById('data-table');
        
        // Reset any existing classes
        tableContainer.classList.remove('drawing-complete');
        table.classList.remove('table-drawn');
        
        // Start the drawing animation
        tableContainer.classList.add('drawing-table');
        
        // Animate table structure appearing step by step
        setTimeout(() => {
            table.classList.add('table-drawn');
        }, 200);
        
        // Complete the drawing animation (after all cells have drawn)
        setTimeout(() => {
            tableContainer.classList.remove('drawing-table');
            tableContainer.classList.add('drawing-complete');
        }, 2200); // 200ms + 500ms (header) + 800ms (last row) + 700ms buffer
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
    const dataPointElements = document.querySelectorAll('.data-point');
    dataPointElements.forEach((point, index) => {
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
