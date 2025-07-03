# Interactive Regression Line Fitting Simulation

An educational web application that demonstrates linear regression concepts through an interactive scatter plot of temperature vs. ice cream sales data.

## 🎯 Learning Objectives

Students will learn:
- What linear regression is and how it works
- How to interpret slope and y-intercept in a real-world context
- What residuals represent and why minimizing them is important
- How the coefficient of determination (R²) measures model fit
- The concept of "best fit" line using least squares method

## ✨ Features

### Interactive Controls
- **Slope Adjustment**: Real-time slider to modify the line's slope (m)
- **Y-Intercept Adjustment**: Real-time slider to modify the y-intercept (b)
- **Equation Display**: Live updating equation in y = mx + b format
- **Best Fit Button**: Automatically animates to the mathematically optimal line
- **Reset Button**: Returns to initial parameter values

### Visual Elements
- **Scatter Plot**: Temperature (°F) vs Ice Cream Sales (units) data points
- **Regression Line**: User-adjustable orange line
- **Best Fit Line**: Optional green dashed line showing optimal solution
- **Residuals**: Purple lines showing errors between data points and current line
- **Interactive Tooltips**: Hover over data points to see exact values

### Real-Time Metrics
- **Sum of Squared Residuals (SSE)**: Total squared error
- **Root Mean Square Error (RMSE)**: Average prediction error
- **R² (Coefficient of Determination)**: Proportion of variance explained (0-1)

### Accessibility Features
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader friendly labels
- Responsive design for all device sizes
- Reduced motion respect for accessibility preferences

## 🚀 Getting Started

### Option 1: GitHub Pages (Recommended)
Visit the live demo at: `https://[your-username].github.io/video-assets/edulearn-regression/`

### Option 2: Local Development
1. Clone this repository
2. Navigate to the `edulearn-regression` folder
3. Open `index.html` in any modern web browser

### Option 3: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Then visit http://localhost:8000/edulearn-regression/
```

## 📊 Dataset

The simulation uses real-world inspired data showing the relationship between temperature and ice cream sales:

| Temperature (°F) | Ice Cream Sales (units) |
|------------------|-------------------------|
| 65               | 200                     |
| 70               | 250                     |
| 75               | 320                     |
| 80               | 400                     |
| 85               | 480                     |
| 90               | 550                     |
| 95               | 600                     |

**Best Fit Line**: y = 9.5x - 462.5 (approximately)
**R² Value**: ~0.99 (excellent fit)

## 🎮 How to Use

### Basic Interaction
1. **Adjust the Line**: Use the slope and y-intercept sliders to move the regression line
2. **Watch the Metrics**: Observe how error metrics change as you adjust the line
3. **Minimize Error**: Try to find the line that minimizes the Sum of Squared Residuals
4. **Check Your Work**: Click "Find Best Fit Line" to see the optimal solution
5. **Toggle Views**: Use checkboxes to show/hide residuals and best fit line

### Educational Workflow
1. **Start with Exploration**: Let students experiment with different slopes and intercepts
2. **Observe Patterns**: Notice how steeper slopes and different intercepts affect the error
3. **Find the Pattern**: Challenge students to minimize the Sum of Squared Residuals manually
4. **Reveal the Solution**: Show the best fit line and compare with student attempts
5. **Discuss Results**: Talk about why this line is "best" and what R² means

## 🛠️ Technical Implementation

### Architecture
- **HTML5**: Semantic structure with accessibility in mind
- **CSS3**: Modern styling with CSS Grid/Flexbox and custom properties
- **JavaScript ES6+**: Object-oriented design with performance optimization
- **SVG**: Scalable vector graphics for crisp visualizations

### Browser Compatibility
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Performance Features
- Smooth 60fps animations using `requestAnimationFrame`
- Efficient DOM manipulation with minimal reflows
- Progressive enhancement for older browsers
- Performance monitoring in development mode

## 🎨 Design System

### Colors (WWL Brand Compliance)
- **Primary Blue**: #0066CC (main brand color)
- **Accent Orange**: #FF6B35 (regression line)
- **Accent Green**: #4CAF50 (best fit line)
- **Accent Purple**: #9C27B0 (residuals)
- **Background**: #F8F9FA (light gray)

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: 600 weight, blue color
- **Body Text**: 400 weight, dark gray
- **Metrics**: Monospace font for precise numerical display

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (side-by-side layout)
- **Tablet**: 768px - 1199px (stacked layout)
- **Mobile**: <768px (compact layout)

### Mobile Optimizations
- Touch-friendly slider controls
- Simplified control panel layout
- Optimized plot size for small screens
- Improved tap targets for accessibility

## 🔧 Customization

### Adding New Data Points
```javascript
// In script.js, modify the dataPoints array
this.dataPoints = [
    { x: 65, y: 200 },
    { x: 70, y: 250 },
    // Add your points here
    { x: newX, y: newY }
];
```

### Changing Scale Ranges
```javascript
// Modify these values in the constructor
this.xMin = 60;    // Minimum X value
this.xMax = 100;   // Maximum X value
this.yMin = 150;   // Minimum Y value
this.yMax = 650;   // Maximum Y value
```

### Customizing Colors
```css
/* In styles.css, modify CSS custom properties */
:root {
    --primary-blue: #0066CC;
    --accent-orange: #FF6B35;
    --accent-green: #4CAF50;
    --accent-purple: #9C27B0;
}
```

## 🧪 Educational Extensions

### Advanced Features to Explore
1. **Multiple Regression**: Add a second independent variable
2. **Non-Linear Regression**: Explore polynomial or exponential relationships
3. **Confidence Intervals**: Show uncertainty around the regression line
4. **Cross-Validation**: Split data into training and testing sets
5. **Different Datasets**: Try with different real-world scenarios

### Discussion Questions
1. Why do we square the residuals instead of just using absolute values?
2. What does it mean when R² is close to 1? Close to 0?
3. How would outliers affect the regression line?
4. When might linear regression not be appropriate?

## 📈 Learning Assessment

### Formative Assessment Ideas
- Have students predict the slope before revealing the best fit
- Ask students to identify which line has lower error without showing metrics
- Challenge students to achieve R² > 0.95 manually

### Summative Assessment Options
- Calculate regression metrics by hand for a subset of data
- Interpret slope and intercept in the context of temperature and ice cream sales
- Explain why the least squares method minimizes prediction errors

## 🤝 Contributing

Contributions are welcome! Please consider:
- Accessibility improvements
- Additional educational features
- Performance optimizations
- Mobile experience enhancements
- Internationalization support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- Microsoft Learn for brand guidelines and color palette
- Educational community for feedback on learning objectives
- Accessibility guidelines from WCAG 2.1
- Performance best practices from web.dev

## 📞 Support

For questions, suggestions, or issues:
1. Check the [GitHub Issues](../../issues) page
2. Review the code comments for implementation details
3. Test in different browsers to isolate problems
4. Consider educational context when reporting bugs

---

**Happy Learning! 📚✨**