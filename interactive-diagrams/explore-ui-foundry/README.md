# Azure AI Foundry Interactive Tutorial

An interactive GitHub Pages tutorial that guides students through the Azure AI Foundry interface using highlighted overlay sections instead of traditional hotspots.

## Features

### 🎯 Interactive Highlights
- Click on highlighted areas overlaid on the screenshot to learn about different UI components
- Smooth hover effects and animations to guide user attention
- No traditional hotspots - uses translucent overlay sections for better visual integration

### 📚 Comprehensive Explanations
- Detailed explanations appear at the bottom of the screen when clicking highlights
- Covers all major UI components: navigation, API keys, project details, and getting started guides
- Educational content tailored for students learning Azure AI Foundry

### 🚀 Navigation Features
- **Manual Navigation**: Click any highlighted area in any order
- **Guided Tour**: Use Previous/Next buttons for a structured walkthrough
- **Auto Tour**: Automated tour that cycles through all features with 4-second intervals
- **Reset Functionality**: Start over at any time

### ♿ Accessibility
- Full keyboard navigation support
- ARIA labels and semantic HTML
- Keyboard shortcuts:
  - `→` or `n`: Next step
  - `←` or `p`: Previous step
  - `r`: Reset tour
  - `h` or `?`: Show help
- Focus indicators and screen reader friendly

### 📊 Progress Tracking
- Visual progress bar showing exploration completion
- Counter showing features explored vs. total features
- Visual indicators for visited sections

## Usage

### For Students
1. Open `index.html` in a web browser or access via GitHub Pages
2. Click on any blue highlighted area to learn about that feature
3. Read explanations in the panel at the bottom
4. Use navigation buttons for a guided experience
5. Try the auto tour for a hands-off overview

### For Educators
- Perfect for classroom demonstrations
- Can be embedded in learning management systems
- Self-paced learning tool for students
- Comprehensive coverage of Azure AI Foundry interface

## Files Structure

```
explore-ui-foundry/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # Interactive functionality
├── foundry-home-page.png   # Screenshot to annotate
└── README.md           # This documentation
```

## Customization

### Adding New Highlights
1. In `index.html`, add a new highlight overlay:
```html
<div class="highlight-overlay" data-section="new-feature" style="top: X%; left: Y%; width: W%; height: H%;">
    <div class="highlight-box"></div>
</div>
```

2. In `script.js`, add the explanation to `tutorialData`:
```javascript
'new-feature': {
    title: 'Feature Name',
    content: 'Detailed explanation of the feature...'
}
```

### Styling Modifications
- Highlight colors can be changed in `styles.css` under `.highlight-box`
- Animation timings and effects are in the CSS transitions and keyframes
- Layout and typography can be adjusted in the respective CSS sections

### Content Updates
- All explanatory text is in the `tutorialData` object in `script.js`
- Update screenshot by replacing `foundry-home-page.png`
- Adjust highlight positions by modifying the `style` attributes in HTML

## GitHub Pages Deployment

1. Push this folder to your GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Set folder to `/` (root) or the specific folder containing these files
5. Your tutorial will be available at: `https://username.github.io/repository-name/interactive-diagrams/explore-ui-foundry/`

## Browser Compatibility

- Modern browsers (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Responsive design works on tablets and mobile devices
- Progressive enhancement ensures basic functionality even without JavaScript

## Educational Objectives

Students will learn about:
- Azure AI Foundry project structure and navigation
- API key management and security
- Endpoint configuration for Azure OpenAI
- Project metadata and resource organization
- Getting started workflow for AI application development

## Contributing

To improve this tutorial:
1. Fork the repository
2. Make your changes
3. Test thoroughly across different browsers
4. Submit a pull request with a clear description

## License

This educational resource is provided as-is for learning purposes. Please ensure compliance with your institution's policies when using in educational settings.
