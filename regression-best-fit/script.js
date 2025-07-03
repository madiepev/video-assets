class RegressionAnimation {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 5;
        this.diagramContainer = document.getElementById('diagramContainer');
        this.stepSlider = document.getElementById('stepSlider');
        this.stepText = document.getElementById('stepText');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.playIcon = this.playPauseBtn.querySelector('.play-icon');
        this.pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
        this.isAnimating = false;
        this.isPlaying = false;
        this.autoPlayTimeout = null;
        
        this.sampleData = [
            { temperature: 75, rain: 0, cloud: 20, icecream: 85 },
            { temperature: 82, rain: 0, cloud: 10, icecream: 120 },
            { temperature: 68, rain: 5, cloud: 70, icecream: 45 },
            { temperature: 90, rain: 0, cloud: 5, icecream: 150 },
            { temperature: 65, rain: 15, cloud: 90, icecream: 25 },
            { temperature: 88, rain: 0, cloud: 15, icecream: 140 },
            { temperature: 72, rain: 8, cloud: 60, icecream: 55 }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderStep(this.currentStep);
        this.startAutoPlay();
    }
    
    setupEventListeners() {
        this.stepSlider.addEventListener('input', (e) => {
            this.pauseAnimation();
            this.currentStep = parseInt(e.target.value);
            this.renderStep(this.currentStep);
        });
        
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseAnimation();
        } else {
            this.startAutoPlay();
        }
    }
    
    startAutoPlay() {
        if (this.currentStep >= this.maxSteps) {
            // Reset to beginning if at the end
            this.currentStep = 1;
            this.stepSlider.value = this.currentStep;
            this.renderStep(this.currentStep);
        }
        
        this.isPlaying = true;
        this.updatePlayPauseButton();
        
        this.autoPlayTimeout = setTimeout(() => {
            this.playToNextStep();
        }, 2500); // Start after 2.5 seconds (longer initial delay)
    }
    
    pauseAnimation() {
        this.isPlaying = false;
        this.isAnimating = false;
        this.updatePlayPauseButton();
        
        if (this.autoPlayTimeout) {
            clearTimeout(this.autoPlayTimeout);
            this.autoPlayTimeout = null;
        }
    }
    
    updatePlayPauseButton() {
        if (this.isPlaying) {
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'flex';
        } else {
            this.playIcon.style.display = 'flex';
            this.pauseIcon.style.display = 'none';
        }
    }
    
    playToNextStep() {
        if (this.currentStep < this.maxSteps && this.isPlaying) {
            this.isAnimating = true;
            this.currentStep++;
            this.stepSlider.value = this.currentStep;
            this.renderStep(this.currentStep);
            
            // Schedule next step
            const nextDelay = this.getStepDelay(this.currentStep);
            this.autoPlayTimeout = setTimeout(() => {
                this.isAnimating = false;
                if (this.currentStep < this.maxSteps && this.isPlaying) {
                    this.playToNextStep();
                } else if (this.currentStep >= this.maxSteps) {
                    // Animation completed
                    this.pauseAnimation();
                }
            }, nextDelay);
        }
    }
    
    getStepDelay(step) {
        switch(step) {
            case 1: return 4000; // Longer pause after headers
            case 2: return 3500; // Longer pause after first row
            case 3: return 3000; // Longer pause after all rows
            case 4: return 2500; // Pause after highlighting
            case 5: return 0;    // Final step
            default: return 3000;
        }
    }
    
    renderStep(step) {
        this.updateStepIndicator(step);
        
        switch(step) {
            case 1:
                this.renderStep1();
                break;
            case 2:
                // If manually navigating to step 2, show headers + first row instantly
                if (!this.isPlaying) {
                    this.renderStep1WithFirstRow();
                } else {
                    this.renderStep2();
                }
                break;
            case 3:
                // If manually navigating to step 3, show complete table instantly
                if (!this.isPlaying) {
                    this.renderCompleteTable();
                } else {
                    this.renderStep3();
                }
                break;
            case 4:
                // If manually navigating to step 4, show complete table with highlighting
                if (!this.isPlaying) {
                    this.renderCompleteTable(true);
                } else {
                    this.renderStep4();
                }
                break;
            case 5:
                // If manually navigating to step 5, show simplified table instantly
                if (!this.isPlaying) {
                    this.renderSimplifiedTable();
                } else {
                    this.renderStep5();
                }
                break;
        }
    }
    
    updateStepIndicator(step) {
        this.stepText.textContent = `Step ${step} of ${this.maxSteps}`;
    }
    
    renderStep1() {
        // Step 1: Table with header only (no data rows)
        const tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>
                            <img src="images/temperature.svg" alt="Temperature" class="table-icon">
                        </th>
                        <th>
                            <img src="images/rain.svg" alt="Rain" class="table-icon">
                        </th>
                        <th>
                            <img src="images/cloud.svg" alt="Cloud" class="table-icon">
                        </th>
                        <th>
                            <span class="arrow-icon">→</span>
                        </th>
                        <th>
                            <img src="images/icecream.svg" alt="Ice Cream" class="table-icon">
                        </th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                </tbody>
            </table>
        `;
        
        this.diagramContainer.innerHTML = tableHTML;
    }
    
    renderStep2() {
        // Step 2: Start with Step 1 (headers only), then add first row
        this.renderStep1();
        
        // Add first row with slow animation
        setTimeout(() => {
            this.addSingleRow(0, 1500); // 1.5 second delay for slow animation
        }, 800);
    }
    
    renderStep3() {
        // Step 3: Start with Step 2's end state (headers + first row), then add remaining rows
        this.renderStep1WithFirstRow();
        
        // Add remaining rows after a brief delay
        setTimeout(() => {
            for (let i = 1; i < this.sampleData.length; i++) {
                setTimeout(() => {
                    this.addSingleRow(i, 400); // Slower animation for subsequent rows
                }, (i - 1) * 350); // 350ms between each row (slower stagger)
            }
        }, 500); // Brief delay before adding remaining rows
    }
    
    renderStep4() {
        // Step 4: Start with Step 3's end state (complete table), then highlight columns
        this.renderCompleteTable();
        setTimeout(() => {
            this.highlightColumns();
        }, 300); // Longer delay before highlighting
    }
    
    renderStep5() {
        // Step 5: Start with Step 4's end state (highlighted table), then simplify to only temp and ice cream
        this.renderCompleteTable(true);
        setTimeout(() => {
            this.animateToSimplifiedTable();
        }, 500); // Brief delay before simplifying
    }
    
    renderStep1WithFirstRow() {
        // Render the complete state of Step 1 (header + first row) instantly
        const tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>
                            <img src="images/temperature.svg" alt="Temperature" class="table-icon">
                        </th>
                        <th>
                            <img src="images/rain.svg" alt="Rain" class="table-icon">
                        </th>
                        <th>
                            <img src="images/cloud.svg" alt="Cloud" class="table-icon">
                        </th>
                        <th>
                            <span class="arrow-icon">→</span>
                        </th>
                        <th>
                            <img src="images/icecream.svg" alt="Ice Cream" class="table-icon">
                        </th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr class="table-row visible" data-row="0">
                        <td>${this.sampleData[0].temperature}°F</td>
                        <td>${this.sampleData[0].rain}"</td>
                        <td>${this.sampleData[0].cloud}%</td>
                        <td><span class="arrow-icon">→</span></td>
                        <td>${this.sampleData[0].icecream}</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        this.diagramContainer.innerHTML = tableHTML;
    }
    
    addSingleRow(index, animationDuration) {
        const tableBody = document.getElementById('tableBody');
        const row = this.sampleData[index];
        
        const rowHTML = `
            <tr class="table-row" data-row="${index}">
                <td>${row.temperature}°F</td>
                <td>${row.rain}"</td>
                <td>${row.cloud}%</td>
                <td><span class="arrow-icon">→</span></td>
                <td>${row.icecream}</td>
            </tr>
        `;
        
        tableBody.insertAdjacentHTML('beforeend', rowHTML);
        
        // Trigger animation
        setTimeout(() => {
            const newRow = tableBody.lastElementChild;
            newRow.style.transition = `all ${animationDuration}ms ease`;
            newRow.classList.add('visible');
        }, 100); // Slightly longer delay before triggering animation
    }
    
    renderCompleteTable(withHighlighting = false) {
        const highlightClass = withHighlighting ? ' highlighted-column' : '';
        
        const tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="${withHighlighting ? 'highlighted-column' : ''}">
                            <img src="images/temperature.svg" alt="Temperature" class="table-icon">
                        </th>
                        <th>
                            <img src="images/rain.svg" alt="Rain" class="table-icon">
                        </th>
                        <th>
                            <img src="images/cloud.svg" alt="Cloud" class="table-icon">
                        </th>
                        <th>
                            <span class="arrow-icon">→</span>
                        </th>
                        <th class="${withHighlighting ? 'highlighted-column' : ''}">
                            <img src="images/icecream.svg" alt="Ice Cream" class="table-icon">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${this.sampleData.map((row, index) => `
                        <tr class="table-row visible" data-row="${index}">
                            <td class="${withHighlighting ? 'highlighted-column' : ''}">${row.temperature}°F</td>
                            <td>${row.rain}"</td>
                            <td>${row.cloud}%</td>
                            <td><span class="arrow-icon">→</span></td>
                            <td class="${withHighlighting ? 'highlighted-column' : ''}">${row.icecream}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        this.diagramContainer.innerHTML = tableHTML;
    }
    
    highlightColumns() {
        const table = document.querySelector('.data-table');
        if (!table) return;
        
        // Highlight temperature column (1st column)
        const tempCells = table.querySelectorAll('th:first-child, td:first-child');
        tempCells.forEach(cell => {
            cell.classList.add('highlighted-column');
        });
        
        // Highlight ice cream column (5th column)
        const iceCreamCells = table.querySelectorAll('th:last-child, td:last-child');
        iceCreamCells.forEach(cell => {
            cell.classList.add('highlighted-column');
        });
    }
    
    renderSimplifiedTable() {
        // Render table with only temperature and ice cream columns (no highlighting)
        const tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>
                            <img src="images/temperature.svg" alt="Temperature" class="table-icon">
                        </th>
                        <th>
                            <img src="images/icecream.svg" alt="Ice Cream" class="table-icon">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${this.sampleData.map((row, index) => `
                        <tr class="table-row visible" data-row="${index}">
                            <td>${row.temperature}°F</td>
                            <td>${row.icecream}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        this.diagramContainer.innerHTML = tableHTML;
    }
    
    animateToSimplifiedTable() {
        const table = document.querySelector('.data-table');
        if (!table) return;
        
        // Fade out the rain, cloud, and arrow columns
        const rainCells = table.querySelectorAll('th:nth-child(2), td:nth-child(2)');
        const cloudCells = table.querySelectorAll('th:nth-child(3), td:nth-child(3)');
        const arrowCells = table.querySelectorAll('th:nth-child(4), td:nth-child(4)');
        
        // Add fade-out animation to all three middle columns
        [...rainCells, ...cloudCells, ...arrowCells].forEach(cell => {
            cell.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            cell.style.opacity = '0';
            cell.style.transform = 'scaleX(0)';
        });
        
        // After animation completes, render the simplified table
        setTimeout(() => {
            this.renderSimplifiedTable();
        }, 800);
    }
}

// Initialize the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RegressionAnimation();
});
