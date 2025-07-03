# Wireframe: Best Fit Line Mechanism

## Overview
This document outlines the essential mechanism for creating an interactive plot that allows users to manually adjust a line and then find the mathematically optimal "best fit" line. This pattern can be reused for other diagram styles and educational visualizations.

## Core Concept Flow

```
1. Display Data Points → 2. Show Adjustable Line → 3. Calculate Errors → 4. Find Best Fit → 5. Animate to Optimal
```

## Essential Data Structure

### Input Data Points
```javascript
// Array of coordinate objects
this.dataPoints = [
    { x: 65, y: 200 },
    { x: 70, y: 250 },
    { x: 75, y: 320 },
    // ... more points
];
```

### Line Parameters
```javascript
// Current user-adjustable line
this.currentSlope = 10.0;
this.currentIntercept = -250;

// Mathematically calculated best fit
this.bestFitSlope = 0;      // Calculated via least squares
this.bestFitIntercept = 0;  // Calculated via least squares
```

## Key Mechanism Components

### 1. Line Calculation (y = mx + b)
```javascript
updateLine() {
    // Calculate line endpoints using linear equation
    const x1 = this.xMin;
    const y1 = this.currentSlope * x1 + this.currentIntercept;
    const x2 = this.xMax;
    const y2 = this.currentSlope * x2 + this.currentIntercept;
    
    // Update visual representation
    this.updateLineVisual(x1, y1, x2, y2);
}
```

### 2. Interactive Controls
```javascript
// Slider event handling pattern
this.slopeSlider.addEventListener('input', (e) => {
    this.currentSlope = parseFloat(e.target.value);
    this.updateDisplay();  // Triggers line recalculation
});

this.interceptSlider.addEventListener('input', (e) => {
    this.currentIntercept = parseFloat(e.target.value);
    this.updateDisplay();  // Triggers line recalculation
});
```

### 3. Error Calculation (Real-time Feedback)
```javascript
calculateMetrics() {
    let sse = 0; // Sum of Squared Errors
    
    this.dataPoints.forEach(point => {
        // Predict Y value using current line
        const predictedY = this.currentSlope * point.x + this.currentIntercept;
        
        // Calculate error (residual)
        const residual = point.y - predictedY;
        
        // Square the error and add to total
        sse += residual * residual;
    });
    
    return { sse, rmse: Math.sqrt(sse / n), r2: 1 - sse/tss };
}
```

### 4. Best Fit Calculation (Least Squares Method)
```javascript
calculateBestFit() {
    const n = this.dataPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    // Calculate sums needed for least squares formula
    this.dataPoints.forEach(point => {
        sumX += point.x;
        sumY += point.y;
        sumXY += point.x * point.y;
        sumXX += point.x * point.x;
    });

    // Apply least squares formulas
    this.bestFitSlope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    this.bestFitIntercept = (sumY - this.bestFitSlope * sumX) / n;
}
```

### 5. Animation to Best Fit
```javascript
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
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        // Interpolate between start and target values
        this.currentSlope = startSlope + (targetSlope - startSlope) * easeOut;
        this.currentIntercept = startIntercept + (targetIntercept - startIntercept) * easeOut;
        
        // Update display
        this.updateSliderValues();
        this.updateDisplay();
        
        // Continue animation or finish
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}
```

## Essential Visual Elements

### Data Points Rendering
```javascript
drawDataPoints() {
    this.dataPoints.forEach((point, index) => {
        // Create visual element (SVG circle, canvas dot, etc.)
        const element = this.createPointElement(point.x, point.y);
        
        // Add interactivity (tooltips, highlighting)
        this.addPointInteractivity(element, point);
        
        // Add to visualization
        this.addToVisualization(element);
    });
}
```

### Line Rendering
```javascript
updateLineVisual(x1, y1, x2, y2) {
    // Convert data coordinates to display coordinates
    const displayCoords = this.dataToDisplayCoordinates(x1, y1, x2, y2);
    
    // Update line element (SVG line, canvas path, etc.)
    this.lineElement.setAttribute('x1', displayCoords.x1);
    this.lineElement.setAttribute('y1', displayCoords.y1);
    this.lineElement.setAttribute('x2', displayCoords.x2);
    this.lineElement.setAttribute('y2', displayCoords.y2);
}
```

### Error Visualization (Residuals)
```javascript
updateResiduals() {
    this.clearResiduals();
    
    this.dataPoints.forEach(point => {
        const predictedY = this.currentSlope * point.x + this.currentIntercept;
        
        // Draw line from actual point to predicted point
        this.drawResidualLine(
            point.x, point.y,        // Actual point
            point.x, predictedY      // Predicted point (same X, different Y)
        );
    });
}
```

## Coordinate System Handling

### Scale Conversion
```javascript
// Convert data coordinates to display coordinates
xScale(dataX) {
    return this.margin.left + 
           (dataX - this.xMin) / (this.xMax - this.xMin) * this.plotWidth;
}

yScale(dataY) {
    return this.margin.top + 
           (this.yMax - dataY) / (this.yMax - this.yMin) * this.plotHeight;
}

// Inverse conversion (display to data coordinates)
xInverse(displayX) {
    return this.xMin + 
           (displayX - this.margin.left) / this.plotWidth * (this.xMax - this.xMin);
}
```

## Implementation Adaptability

### For Different Visualization Libraries

**SVG Implementation:**
```javascript
// Line as SVG element
this.lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
this.lineElement.setAttribute('class', 'regression-line');
```

**Canvas Implementation:**
```javascript
// Line drawing function
drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
}
```

**D3.js Implementation:**
```javascript
// Line using D3 selection
this.line = d3.select(this.svg)
    .append('line')
    .attr('class', 'regression-line');
    
// Update line
this.line
    .attr('x1', this.xScale(x1))
    .attr('y1', this.yScale(y1))
    .attr('x2', this.xScale(x2))
    .attr('y2', this.yScale(y2));
```

## Key Mathematical Concepts

### Linear Equation
```
y = mx + b
where:
- m = slope (rate of change)
- b = y-intercept (value when x=0)
- x = independent variable
- y = dependent variable
```

### Least Squares Formulas
```
slope = (n∑xy - ∑x∑y) / (n∑x² - (∑x)²)
intercept = (∑y - slope∑x) / n

where n = number of data points
```

### Error Metrics
```
Residual = actual_y - predicted_y
SSE = Σ(residual²)
RMSE = √(SSE/n)
R² = 1 - (SSE/TSS)
```

## User Interaction Flow

1. **Initial State**: Show data points and default line
2. **Exploration**: User adjusts slope/intercept sliders
3. **Feedback**: Real-time error metrics update
4. **Discovery**: User tries to minimize error manually
5. **Revelation**: "Find Best Fit" reveals optimal solution
6. **Comparison**: User can compare their attempt vs. optimal

## Reusability Considerations

### Parameterization
```javascript
// Make the mechanism configurable
const config = {
    dataPoints: [...],
    xRange: { min: 60, max: 100 },
    yRange: { min: 150, max: 650 },
    initialSlope: 10.0,
    initialIntercept: -250,
    animationDuration: 1000
};
```

### Extension Points
- **Different Regression Types**: Linear, polynomial, exponential
- **Multiple Lines**: Compare different models simultaneously
- **Interactive Data**: Allow users to add/remove/move data points
- **Different Error Metrics**: Absolute error, custom cost functions
- **Confidence Intervals**: Show uncertainty bands around best fit

## Performance Considerations

- **Debounce Updates**: Avoid excessive recalculations during slider dragging
- **Efficient Rendering**: Only update changed visual elements
- **Animation Performance**: Use `requestAnimationFrame` for smooth animations
- **Memory Management**: Clean up event listeners and DOM elements

## Educational Value

This mechanism effectively demonstrates:
- **Linear relationships** in data
- **Trial and error** vs. **mathematical optimization**
- **Real-time feedback** on prediction accuracy
- **Visual representation** of abstract mathematical concepts
- **Interactive exploration** of parameter effects

The pattern is highly reusable for any scenario involving:
- Parameter optimization
- Model fitting
- Interactive mathematical exploration
- Before/after comparisons
- Guided discovery learning
