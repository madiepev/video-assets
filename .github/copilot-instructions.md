# Copilot Instructions for Video Assets Repository

This repository contains various interactive web demonstrations and prototypes for educational content and presentations.

## Project Overview

The repository includes several interactive demonstrations:

### 1. Temperature vs Ice Cream Interactive Diagram (`wireframe-table-graph/`)

**Current Implementation Status: ✅ COMPLETE**

An interactive web page demonstrating the correlation between temperature and ice cream sales through synchronized table and graph visualizations.

#### Key Features:
- **Dual Layout**: Side-by-side table (left) and SVG scatter plot (right)
- **Step-by-step Animation**: Synchronized revealing of table rows and graph data points
- **WWL Brand Compliance**: Uses official Microsoft Learn brand colors and typography
- **Interactive Controls**: Bottom control bar with play/pause, step navigation, and progress tracking
- **Responsive Design**: Adapts to different screen sizes while maintaining readability
- **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML

#### Technical Implementation:

**Layout & Styling:**
- Flexbox layout with table (flex: 0.8, max-width: 400px) and graph (flex: 1.2, min-width: 400px)
- Table headers use SVG icons (temperature.svg, icecream.svg) instead of emoji
- All content centered both vertically and horizontally in viewport
- Font sizes increased throughout for better readability:
  - Headers: 1.8rem (mobile: 1.5rem)
  - Body text: 1.1rem (mobile: 1rem)
  - Controls: 1rem (mobile: 0.9rem)

**Animation System:**
- Step-based progression through 7 data points
- Table rows fade in first, then corresponding graph dots slide in horizontally from the left
- Smooth transitions using CSS transforms and opacity
- Progress bar shows current step progress
- No hover effects on interactive elements (removed per requirements)

**Data Visualization:**
- SVG scatter plot with temperature (x-axis) vs ice cream sales (y-axis)
- Data points: [(65,200), (70,250), (75,320), (80,400), (85,480), (90,550), (95,600)]
- Dots positioned using calculated coordinates within 600x400 SVG viewBox
- Color-coded dots using WWL accent colors

**Control Interface:**
- Fixed bottom control bar with:
  - Play/Pause button with dynamic icon switching
  - Previous/Next step buttons
  - Step counter (e.g., "Step 3 of 7")
  - Progress bar with smooth transitions

**Brand Compliance:**
- Primary colors: #0066CC (WWL Blue), #FFFFFF (White)
- Accent colors: #FF6B35 (Orange), #4CAF50 (Green), #9C27B0 (Purple)
- Background: #F8F9FA (Light Gray)
- Typography: System fonts with proper font weights and sizes
- Consistent spacing and border radius (8px) throughout

#### File Structure:
```
wireframe-table-graph/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with WWL branding
├── script.js           # Animation logic and interactivity
├── README.md           # Documentation and setup instructions
└── images/
    ├── temperature.svg  # Temperature icon for table header
    ├── icecream.svg    # Ice cream icon for table header
    └── rain.svg        # Additional weather icon (available)
```

#### Code Quality Standards:
- Clean, well-commented code with descriptive variable names
- Semantic HTML with proper accessibility attributes
- CSS organized by components with consistent naming conventions
- JavaScript using modern ES6+ features with proper error handling
- Responsive design using relative units and media queries

### 2. Other Projects

#### Mock-up Demos (`mock-up/`)
- Static HTML demonstrations
- Calendar interface mockup
- Ice cream app interface
- Temperature input interface

#### Transition Demos (`transition/`)
- Icon-based table demonstrations
- Various animation examples

#### Vibe Coding Prototype (`VibeCodingPrototypeAPp/`)
- E-commerce application prototype
- Product requirement documents
- Wireframe specifications for checkout, navigation, product details, shopping cart

#### Wireframe Cluster (`wireframe-cluster/`)
- K-means clustering visualization
- Interactive diagram demonstration

## Development Guidelines

### When Working on Interactive Diagrams:

1. **Brand Consistency**: Always use WWL brand colors and typography
2. **Accessibility First**: Include proper ARIA labels, keyboard navigation, and semantic HTML
3. **Responsive Design**: Ensure compatibility across device sizes
4. **Performance**: Optimize animations and use efficient DOM manipulation
5. **Code Quality**: Write clean, well-documented code with consistent naming

### Styling Standards:
- Use CSS custom properties for consistent theming
- Implement mobile-first responsive design
- Follow BEM methodology for CSS class naming
- Ensure sufficient color contrast for accessibility

### JavaScript Standards:
- Use modern ES6+ syntax
- Implement proper error handling
- Add comprehensive code comments
- Use meaningful variable and function names

### Animation Guidelines:
- Smooth, purposeful animations that enhance understanding
- Respect user preferences for reduced motion
- Consistent timing and easing functions
- Progressive enhancement approach

## Repository Maintenance

- Keep README files updated with current functionality
- Maintain consistent file structure across projects
- Document any breaking changes or major updates
- Ensure all interactive elements are tested across browsers

## Future Enhancements

Potential improvements for the Temperature vs Ice Cream diagram:
- Add data export functionality
- Implement custom data input
- Add more visualization types (bar chart, line graph)
- Include temperature unit conversion
- Add seasonal data variations
