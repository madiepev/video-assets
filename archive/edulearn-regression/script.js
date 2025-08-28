// Interactive Regression Line Fitting Simulation
class RegressionSimulation {
    constructor() {
        // Data points (Temperature vs Ice Cream Sales)
        this.dataPoints = [
            { x: 65, y: 200 },
            { x: 70, y: 250 },
            { x: 75, y: 320 },
            { x: 80, y: 400 },
            { x: 85, y: 480 },
            { x: 90, y: 550 },
            { x: 95, y: 600 }
        ];

        // SVG dimensions and margins
        this.svgWidth = 600;
        this.svgHeight = 400;
        this.margin = { top: 30, right: 30, bottom: 60, left: 60 };
        this.plotWidth = this.svgWidth - this.margin.left - this.margin.right;
        this.plotHeight = this.svgHeight - this.margin.top - this.margin.bottom;

        // Scale ranges
        this.xMin = 60;
        this.xMax = 100;
        this.yMin = 150;
        this.yMax = 650;

        // Current line parameters
        this.currentSlope = 10.0;
        this.currentIntercept = -250;

        // Best fit line parameters (calculated)
        this.bestFitSlope = 0;
        this.bestFitIntercept = 0;

        // Initialize the simulation
        this.initializeElements();
        this.calculateBestFit();
        this.setupEventListeners();
        this.drawPlot();
        this.updateLine();
    }

    initializeElements() {
        // Get DOM elements
        this.slopeSlider = document.getElementById('slope-slider');
        this.interceptSlider = document.getElementById('intercept-slider');
        this.slopeValue = document.getElementById('slope-value');
        this.interceptValue = document.getElementById('intercept-value');
        this.equation = document.getElementById('equation');
        this.sseValue = document.getElementById('sse-value');
        this.rmseValue = document.getElementById('rmse-value');
        this.r2Value = document.getElementById('r2-value');
        this.bestFitBtn = document.getElementById('best-fit-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.showResidualsCheckbox = document.getElementById('show-residuals');
        this.showBestFitCheckbox = document.getElementById('show-best-fit');
        this.svg = document.getElementById('plot-svg');
        this.regressionLine = document.getElementById('regression-line');
        this.bestFitLine = document.getElementById('best-fit-line');
        this.residualsGroup = document.getElementById('residuals');
        this.dataPointsGroup = document.getElementById('data-points');
    }

    setupEventListeners() {
        // Slider event listeners
        this.slopeSlider.addEventListener('input', (e) => {
            this.currentSlope = parseFloat(e.target.value);
            this.updateDisplay();
        });

        this.interceptSlider.addEventListener('input', (e) => {
            this.currentIntercept = parseFloat(e.target.value);
            this.updateDisplay();
        });

        // Button event listeners
        this.bestFitBtn.addEventListener('click', () => {
            this.animateToBestFit();
        });

        this.resetBtn.addEventListener('click', () => {
            this.resetLine();
        });

        // Checkbox event listeners
        this.showResidualsCheckbox.addEventListener('change', () => {
            this.updateResiduals();
        });

        this.showBestFitCheckbox.addEventListener('change', () => {
            this.toggleBestFitLine();
        });
    }

    // Convert data coordinates to SVG coordinates
    xScale(x) {
        return this.margin.left + (x - this.xMin) / (this.xMax - this.xMin) * this.plotWidth;
    }

    yScale(y) {
        return this.margin.top + (this.yMax - y) / (this.yMax - this.yMin) * this.plotHeight;
    }

    // Convert SVG coordinates back to data coordinates
    xInverse(svgX) {
        return this.xMin + (svgX - this.margin.left) / this.plotWidth * (this.xMax - this.xMin);
    }

    yInverse(svgY) {
        return this.yMax - (svgY - this.margin.top) / this.plotHeight * (this.yMax - this.yMin);
    }

    drawPlot() {
        // Clear existing elements
        this.clearPlot();

        // Draw axes
        this.drawAxes();

        // Draw data points
        this.drawDataPoints();

        // Draw initial line
        this.updateLine();
    }

    clearPlot() {
        // Clear axis labels and ticks
        document.getElementById('axis-labels').innerHTML = '';
        document.getElementById('axis-ticks').innerHTML = '';
    }

    drawAxes() {
        // Clear any existing ticks and labels (but don't generate new ones)
        const axisLabels = document.getElementById('axis-labels');
        const axisTicks = document.getElementById('axis-ticks');
        axisLabels.innerHTML = '';
        axisTicks.innerHTML = '';
        
        // Only keep the basic axes lines which are already in the HTML
        // No ticks or numeric labels needed
    }

    drawDataPoints() {
        this.dataPointsGroup.innerHTML = '';
        
        this.dataPoints.forEach((point, index) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', this.xScale(point.x));
            circle.setAttribute('cy', this.yScale(point.y));
            circle.setAttribute('r', 6);
            circle.setAttribute('class', 'data-point-svg');
            circle.setAttribute('data-index', index);
            
            // Add tooltip on hover
            circle.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, point);
            });
            
            circle.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            this.dataPointsGroup.appendChild(circle);
        });
    }

    updateLine() {
        // Calculate line endpoints
        const x1 = this.xMin;
        const y1 = this.currentSlope * x1 + this.currentIntercept;
        const x2 = this.xMax;
        const y2 = this.currentSlope * x2 + this.currentIntercept;

        // Update regression line
        this.regressionLine.setAttribute('x1', this.xScale(x1));
        this.regressionLine.setAttribute('y1', this.yScale(y1));
        this.regressionLine.setAttribute('x2', this.xScale(x2));
        this.regressionLine.setAttribute('y2', this.yScale(y2));

        // Update residuals
        this.updateResiduals();

        // Update metrics
        this.updateMetrics();
    }

    updateResiduals() {
        this.residualsGroup.innerHTML = '';
        
        if (!this.showResidualsCheckbox.checked) {
            return;
        }

        this.dataPoints.forEach(point => {
            const predictedY = this.currentSlope * point.x + this.currentIntercept;
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', this.xScale(point.x));
            line.setAttribute('y1', this.yScale(point.y));
            line.setAttribute('x2', this.xScale(point.x));
            line.setAttribute('y2', this.yScale(predictedY));
            line.setAttribute('class', 'residual-line-svg');
            
            this.residualsGroup.appendChild(line);
        });
    }

    updateBestFitLine() {
        const x1 = this.xMin;
        const y1 = this.bestFitSlope * x1 + this.bestFitIntercept;
        const x2 = this.xMax;
        const y2 = this.bestFitSlope * x2 + this.bestFitIntercept;

        this.bestFitLine.setAttribute('x1', this.xScale(x1));
        this.bestFitLine.setAttribute('y1', this.yScale(y1));
        this.bestFitLine.setAttribute('x2', this.xScale(x2));
        this.bestFitLine.setAttribute('y2', this.yScale(y2));
    }

    toggleBestFitLine() {
        if (this.showBestFitCheckbox.checked) {
            this.bestFitLine.style.display = 'block';
            this.updateBestFitLine();
        } else {
            this.bestFitLine.style.display = 'none';
        }
    }

    updateDisplay() {
        // Update slider values
        this.slopeValue.textContent = this.currentSlope.toFixed(1);
        this.interceptValue.textContent = this.currentIntercept.toFixed(0);
        
        // Update equation
        const interceptText = this.currentIntercept >= 0 ? 
            `+ ${this.currentIntercept.toFixed(0)}` : 
            `${this.currentIntercept.toFixed(0)}`;
        this.equation.textContent = `y = ${this.currentSlope.toFixed(1)}x ${interceptText}`;
        
        // Update line and metrics
        this.updateLine();
    }

    updateMetrics() {
        const metrics = this.calculateMetrics();
        
        this.sseValue.textContent = metrics.sse.toLocaleString('en-US', { maximumFractionDigits: 0 });
        this.rmseValue.textContent = metrics.rmse.toLocaleString('en-US', { maximumFractionDigits: 1 });
        this.r2Value.textContent = metrics.r2.toFixed(3);
    }

    calculateMetrics() {
        let sse = 0; // Sum of Squared Errors
        let sumY = 0;
        let sumYSquared = 0;

        this.dataPoints.forEach(point => {
            const predictedY = this.currentSlope * point.x + this.currentIntercept;
            const residual = point.y - predictedY;
            sse += residual * residual;
            sumY += point.y;
            sumYSquared += point.y * point.y;
        });

        const n = this.dataPoints.length;
        const meanY = sumY / n;
        const tss = sumYSquared - n * meanY * meanY; // Total Sum of Squares
        const rmse = Math.sqrt(sse / n);
        const r2 = Math.max(0, 1 - sse / tss); // R-squared (coefficient of determination)

        return { sse, rmse, r2 };
    }

    calculateBestFit() {
        // Calculate least squares regression
        const n = this.dataPoints.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

        this.dataPoints.forEach(point => {
            sumX += point.x;
            sumY += point.y;
            sumXY += point.x * point.y;
            sumXX += point.x * point.x;
        });

        // Calculate slope and intercept using least squares formula
        this.bestFitSlope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        this.bestFitIntercept = (sumY - this.bestFitSlope * sumX) / n;
    }

    animateToBestFit() {
        const startSlope = this.currentSlope;
        const startIntercept = this.currentIntercept;
        const targetSlope = this.bestFitSlope;
        const targetIntercept = this.bestFitIntercept;
        
        const duration = 1000; // 1 second
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            // Interpolate values
            this.currentSlope = startSlope + (targetSlope - startSlope) * easeOut;
            this.currentIntercept = startIntercept + (targetIntercept - startIntercept) * easeOut;
            
            // Update sliders and display
            this.slopeSlider.value = this.currentSlope;
            this.interceptSlider.value = this.currentIntercept;
            this.updateDisplay();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final values are exact
                this.currentSlope = targetSlope;
                this.currentIntercept = targetIntercept;
                this.slopeSlider.value = this.currentSlope;
                this.interceptSlider.value = this.currentIntercept;
                this.updateDisplay();
            }
        };
        
        requestAnimationFrame(animate);
    }

    resetLine() {
        this.currentSlope = 10.0;
        this.currentIntercept = -250;
        this.slopeSlider.value = this.currentSlope;
        this.interceptSlider.value = this.currentIntercept;
        this.updateDisplay();
    }

    showTooltip(event, point) {
        // Create tooltip element if it doesn't exist
        let tooltip = document.getElementById('data-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'data-tooltip';
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                white-space: nowrap;
            `;
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = `Temperature: ${point.x}°F, Sales: ${point.y} units`;
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY - 30 + 'px';
        tooltip.style.display = 'block';
    }

    hideTooltip() {
        const tooltip = document.getElementById('data-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RegressionSimulation();
});

// Add some helper functions for enhanced interactivity
document.addEventListener('keydown', (e) => {
    // Allow keyboard navigation
    if (e.key === 'Tab') {
        // Ensure focus indicators are visible
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('click', () => {
    // Remove keyboard navigation class when clicking
    document.body.classList.remove('keyboard-navigation');
});

// Add performance monitoring for smooth animations
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
        }
    }
});

if ('PerformanceObserver' in window) {
    perfObserver.observe({ entryTypes: ['measure'] });
}

// Export for potential testing or extension
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RegressionSimulation;
}