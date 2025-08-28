# K-Means Clustering Phases Interactive Visualization

An interactive educational tool that demonstrates the K-Means clustering algorithm through a step-by-step visual progression using static images.

## Features

### 🎯 Interactive Learning Experience
- **Step-by-step progression** through 6 phases of K-Means clustering
- **Static image display** using pre-generated clustering visualizations
- **Enhanced progress bar** with clickable dots for direct navigation
- **Detailed explanations** below each image for better understanding

### 🎮 User Controls
- **Play/Pause**: Automatic progression with 3-second intervals
- **Navigation**: Previous/Next buttons for manual control
- **Direct Access**: Click progress dots to jump to any step
- **Reset**: Return to the beginning at any time
- **Keyboard Support**: Arrow keys, spacebar, and Home key

### 📱 Responsive Design
- **Mobile-friendly** layout that adapts to different screen sizes
- **WWL Brand Compliance** using official Microsoft Learn colors
- **Accessibility features** with ARIA labels and keyboard navigation

## Algorithm Steps

1. **Initial Data Points**: Display unclustered data points
2. **Initialize Centroids**: Place random cluster centers
3. **Assign Points to Clusters**: Group points by nearest centroid
4. **Update Centroid Positions**: Move centroids to cluster means
5. **Reassign Points**: Update assignments based on new centroids
6. **Convergence Achieved**: Final stable clustering result

## File Structure

```
clustering-phases/
├── index.html          # Main HTML structure
├── styles.css          # WWL-compliant styling
├── script.js           # Interactive functionality
├── README.md           # This documentation
└── images/
    ├── clustering-1.png # Phase 1: Initial data points
    ├── clustering-2.png # Phase 2: Initialize centroids
    ├── clustering-3.png # Phase 3: Assign to clusters
    ├── clustering-4.png # Phase 4: Update centroids
    ├── clustering-5.png # Phase 5: Reassign points
    └── clustering-6.png # Phase 6: Final convergence
```

## Technical Implementation

### HTML Structure
- Semantic HTML with proper accessibility attributes
- Image container for displaying clustering phases
- Enhanced control panel with progress tracking
- Step information panel positioned below the image
- Legend and informational content

### CSS Styling
- **Brand Colors**: WWL blue (#0066CC), accent colors for clusters
- **Responsive Layout**: Flexbox and CSS Grid for optimal display
- **Enhanced Progress Bar**: Visual dots with hover states and transitions
- **Smooth Animations**: CSS transitions for professional feel
- **Mobile Optimization**: Media queries for various screen sizes

### JavaScript Functionality
- **Class-based Architecture**: Clean, maintainable code structure
- **Event-driven Interactions**: Keyboard and mouse support
- **State Management**: Current step tracking and validation
- **Animation Control**: Auto-play with user override capabilities
- **Error Handling**: Graceful fallbacks for missing images

## Usage

1. **Automatic Mode**: The visualization plays automatically, advancing every 3 seconds
2. **Manual Navigation**: Use Previous/Next buttons or arrow keys
3. **Direct Access**: Click any progress dot to jump to that step
4. **Pause Control**: Use spacebar or the pause button to stop auto-play

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Modify Step Timing
```javascript
// In script.js, change the animationSpeed property
this.animationSpeed = 4000; // 4 seconds instead of 3
```

### Update Step Descriptions
```javascript
// In script.js, modify the stepInfo object
this.stepInfo = {
    1: {
        title: "Your Custom Title",
        description: "Your custom description..."
    }
    // ... other steps
};
```

### Change Colors
```css
/* In styles.css, modify the CSS custom properties */
:root {
    --blue-primary: #your-color;
    --orange-accent: #your-accent;
    /* ... other colors */
}
```

## Performance Notes

- Images are loaded on-demand for optimal performance
- CSS animations use transform and opacity for smooth rendering
- Event listeners are properly managed to prevent memory leaks
- Responsive images scale efficiently across devices

## Accessibility Features

- **ARIA Labels**: Proper semantic markup for screen readers
- **Keyboard Navigation**: Full functionality without mouse
- **Focus Management**: Clear visual focus indicators
- **High Contrast**: Sufficient color contrast ratios
- **Reduced Motion**: Respects user motion preferences

## Future Enhancements

- Add animation between image transitions
- Include data point coordinate display
- Add cluster statistics panel
- Implement custom data input
- Add export functionality for educational materials
