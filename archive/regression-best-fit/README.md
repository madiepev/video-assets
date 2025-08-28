# Regression Animation - Best Fit Line Interactive

## Overview
This is a step-by-step animated demonstration showing the progression from raw data collection to regression analysis. The animation follows WWL (Microsoft Learn) branding guidelines and uses the Patrick Hand font for a consistent educational experience.

## Features

### Step 1: Table Structure
- Displays a table header with five columns
- Icons for: Temperature, Rain, Cloud, Arrow (→), Ice Cream
- Shows the relationship structure before data is introduced

### Step 2: Data Population
- Animates the addition of 7 rows of fictional weather and ice cream sales data
- Each row appears with a staggered animation (200ms delay between rows)
- Data includes: temperature (°F), rainfall (inches), cloudiness (%), and ice cream sales

### Step 3: Column Highlighting
- Highlights the temperature and ice cream sales columns with a textured neutral gray background
- Uses a diagonal stripe pattern to emphasize the relationship being analyzed
- Focuses attention on the two variables that will be used for regression

## Sample Data
The animation uses realistic fictional data representing:
- Temperature: 65°F - 90°F
- Rainfall: 0" - 15"
- Cloudiness: 5% - 90%
- Ice Cream Sales: 25 - 150 units

## Technical Implementation

### Color Scheme
- Background: Neutral gray (`#e8e6df`)
- Text: Blue-black (`#091f2c`)
- Typography: Patrick Hand (Google Fonts)
- Highlighted columns: Textured neutral gray with diagonal stripes

### Interactive Controls
- **Step Slider**: Full-width slider to navigate between steps
- **Step Indicator**: Shows current step (e.g., "Step 2 of 3")
- **Instant Navigation**: Click or drag to jump to any step

### Responsive Design
- Mobile-optimized layout
- Scalable icons and text sizes
- Flexible table sizing for different screen sizes

### Animation System
- CSS transitions for smooth row appearance
- Staggered timing for data population
- Highlighting effects with texture patterns

## File Structure
```
regression-best-fit/
├── index.html          # Main HTML structure
├── styles.css          # WWL-branded styling with animations
├── script.js           # Step-based animation logic
├── color-scheme.md     # Complete WWL color specification
├── README.md           # This documentation
└── images/
    ├── temperature.svg  # Temperature icon
    ├── rain.svg        # Rain icon
    ├── cloud.svg       # Cloud icon
    └── icecream.svg    # Ice cream icon
```

## Usage
1. Open `index.html` in a web browser
2. Use the slider at the bottom to navigate between steps
3. Watch the progression from empty table to highlighted data relationships

## Educational Value
This animation demonstrates:
- **Data Structure**: How to organize multi-variable data
- **Variable Selection**: Identifying relevant variables for analysis
- **Visual Highlighting**: Emphasizing relationships between variables
- **Progressive Disclosure**: Building complexity step by step

## Brand Compliance
- Follows WWL color palette specifications
- Uses Patrick Hand font for consistency with other educational materials
- Maintains accessibility standards with proper contrast ratios
- Responsive design for multiple device types

## Future Extensions
This foundation can be extended to include:
- Step 4: Scatter plot visualization
- Step 5: Interactive line adjustment
- Step 6: Best fit line calculation
- Step 7: Error metrics and R² visualization

## Browser Compatibility
- Modern browsers with CSS Grid and Flexbox support
- SVG icon support
- ES6+ JavaScript features
