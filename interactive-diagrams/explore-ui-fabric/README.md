# Interactive Fabric Interface Explorer

An interactive wireframe tool for exploring Microsoft Fabric's user interface components. This educational tool helps students understand different parts of the Fabric interface through clickable hotspots and detailed explanations.

## 🚀 Features

- **Interactive Hotspots**: Clickable areas that reveal detailed information about each UI component
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **GitHub Pages Ready**: Pre-configured for easy deployment
- **Customizable Content**: Easy to modify for different products or interfaces

## 📁 Project Structure

```
explore-ui/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and interactions
├── fabric-notes.png    # Main interface screenshot
└── README.md          # This documentation
```

## 🎯 Interactive Elements

The current wireframe includes hotspots for:

1. **Microsoft 365 App Switcher** - Navigation between M365 apps
2. **Universal Search** - Search functionality across workspaces
3. **Free Trial Information** - Trial status and feedback options
4. **Browse Section** - Content discovery and organization
5. **Workspaces Navigation** - Workspace selection and management
6. **Open Artifacts** - Currently active items
7. **Product Experiences** - Different functional areas in Fabric
8. **Dynamic UI Context** - Context-aware interface changes

## 🚀 Deployment to GitHub Pages

### Method 1: GitHub Web Interface

1. Push this folder to your GitHub repository
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select source as "Deploy from a branch"
5. Choose "main" branch and "/ (root)" or "/docs" folder
6. Your site will be available at `https://yourusername.github.io/repository-name/`

### Method 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./interactive-diagrams/explore-ui
```

## 🎨 Customization Guide

### Adding New Hotspots

1. **HTML**: Add a new hotspot div in `index.html`
```html
<div class="hotspot hotspot-new-feature" data-info="new-feature">
    <div class="hotspot-indicator"></div>
</div>
```

2. **CSS**: Position the hotspot in `styles.css`
```css
.hotspot-new-feature {
    top: 25%;
    left: 60%;
}
```

3. **JavaScript**: Add content in `script.js`
```javascript
const infoContent = {
    // ... existing content
    'new-feature': {
        title: 'New Feature Title',
        content: `
            <p>Description of the new feature...</p>
            <ul>
                <li>Feature benefit 1</li>
                <li>Feature benefit 2</li>
            </ul>
        `
    }
};
```

### Changing the Interface Image

1. Replace `fabric-notes.png` with your new interface screenshot
2. Update hotspot positions in `styles.css` to match your new image
3. Modify content in `script.js` to reflect your interface

### Styling Customization

- **Colors**: Modify the CSS custom properties for consistent theming
- **Animations**: Adjust the `@keyframes pulse` animation
- **Layout**: Update responsive breakpoints in media queries
- **Typography**: Change font families and sizes

## 📱 Responsive Behavior

The interface automatically adapts to different screen sizes:

- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-optimized with larger hotspot areas
- **Mobile**: Simplified layout with accessible touch targets

## ♿ Accessibility Features

- **Keyboard Navigation**: Tab through hotspots, use arrow keys to navigate
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Configurable color schemes
- **Focus Management**: Clear focus indicators and logical tab order

## 🔧 Browser Compatibility

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile Browsers**: iOS Safari 13+, Chrome Mobile 80+
- **Fallbacks**: Graceful degradation for older browsers

## 📊 Analytics Integration

The tool includes hooks for analytics tracking:

```javascript
// Example: Google Analytics 4
function trackInteraction(action, element) {
    gtag('event', action, {
        element_type: 'hotspot',
        element_id: element
    });
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] All hotspots are clickable
- [ ] Information panels display correctly
- [ ] Responsive design works on different screen sizes
- [ ] Keyboard navigation functions properly
- [ ] Image loads correctly
- [ ] Close buttons work in all scenarios

### Automated Testing

For unit testing, the main functions are exported:

```javascript
const { showInfoPanel, closeInfoPanel } = require('./script.js');
```

## 🔄 Version History

- **v1.0**: Initial release with Fabric interface
- **v1.1**: Added accessibility improvements
- **v1.2**: Enhanced responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-hotspot`)
3. Commit your changes (`git commit -am 'Add new hotspot'`)
4. Push to the branch (`git push origin feature/new-hotspot`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Hotspots not appearing**: Check that the image path is correct and the image loads successfully.

**Positioning problems**: Verify that hotspot percentages in CSS match your image dimensions.

**Mobile responsiveness**: Test on actual devices, not just browser dev tools.

**GitHub Pages not updating**: Clear browser cache and check GitHub Actions logs.

### Support

For questions or issues:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include browser version and screenshots if applicable

## 🎓 Educational Use

This tool is designed for educational purposes to help students understand complex interfaces. Consider these teaching strategies:

- **Guided Tours**: Walk students through each hotspot systematically
- **Self-Exploration**: Let students discover features independently
- **Assessment**: Create quizzes based on the hotspot content
- **Customization Projects**: Have students create their own interface explorations
