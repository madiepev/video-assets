# Azure Storage Account Interactive Mockups

This repository contains three distinct style variations of an Azure Storage Account interactive guide, all using the official Microsoft Learn PowerPoint theme accent colors for consistency.

## Style Variations

### 1. Handwritten/Playful Style (`storage-account-sequential/`)
**Design Philosophy:** Friendly, approachable, and educational
- **Typography:** Patrick Hand font for handwritten feel
- **Visual Elements:** Rotated cards, playful animations, emoji icons
- **Interaction:** Confetti effects, bounce animations
- **Target Audience:** Learners who prefer casual, engaging experiences

### 2. Minimal/Clean Style (`storage-account-minimal/`)
**Design Philosophy:** Clean, focused, and distraction-free
- **Typography:** System fonts with excellent readability
- **Visual Elements:** Maximum white space, geometric shapes
- **Interaction:** Subtle transitions, simple progress indicators
- **Target Audience:** Users who prefer streamlined, efficient interfaces

### 3. Sleek/Modern Style (`storage-account-sleek/`)
**Design Philosophy:** Premium, professional, and sophisticated
- **Typography:** Inter font with multiple weights
- **Visual Elements:** Sidebar navigation, circular progress, rich animations
- **Interaction:** Complex transitions, particle effects, rotating elements
- **Target Audience:** Enterprise users and technical professionals

## Official Color Palette

All three mockups use the Microsoft Learn PowerPoint theme accent colors:

```css
:root {
    --accent-red-orange: #FF5722;  /* Red-Orange accent */
    --accent-purple: #9C27B0;      /* Purple accent */
    --accent-orange: #FF6B35;      /* Orange accent */
    --accent-light-purple: #B39DDB; /* Light purple accent */
    --accent-yellow: #FFC107;      /* Yellow accent */
    --accent-gray: #9E9E9E;        /* Gray accent */
}
```

## Common Features

All three mockups share:
- **7-Step Walkthrough:** Comprehensive Azure Storage Account overview
- **Responsive Design:** Mobile-friendly layouts
- **Keyboard Navigation:** Arrow keys, space bar, number keys
- **Touch Support:** Swipe gestures on mobile devices
- **Progress Tracking:** Visual indicators and step completion
- **Accessibility:** ARIA labels, semantic HTML, screen reader support

## Content Structure

Each guide covers:
1. **Storage Account Overview** - Introduction and unique namespace concept
2. **Performance Tiers** - Standard vs Premium comparison
3. **Storage Services** - Blob, Files, Queues, Tables overview
4. **Blob Containers** - Logical organization and access policies
5. **Blob Types** - Block, Page, and Append blob specifications
6. **Access Tiers** - Hot, Cool, Cold, Archive tier comparison
7. **Complete Architecture** - Full solution overview

## Technical Implementation

- **Pure Vanilla JavaScript** - No frameworks required
- **CSS Custom Properties** - Consistent color theming
- **Modern CSS Features** - Grid, Flexbox, animations
- **Progressive Enhancement** - Works without JavaScript
- **GitHub Pages Compatible** - Static hosting ready

## Usage for Survey/Research

These three mockups are designed for user research to identify preferences around:
- **Visual Style Preferences** - Playful vs minimal vs professional
- **Information Density** - How much content per screen
- **Navigation Preferences** - Button vs sidebar vs dot navigation
- **Animation Tolerance** - From subtle to rich animations
- **Accessibility Needs** - Different approaches to inclusive design

## File Structure

```
storage-account-sequential/     # Handwritten/Playful
├── index.html
├── styles.css
├── script.js
└── README.md

storage-account-minimal/        # Minimal/Clean
├── index.html
├── styles.css
├── script.js
└── README.md

storage-account-sleek/          # Sleek/Modern
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Survey Questions to Consider

When presenting these mockups to users, consider asking:

1. **Visual Appeal:** Which style feels most appropriate for learning Azure concepts?
2. **Information Processing:** Which layout helps you understand the content best?
3. **Navigation Preference:** Which navigation method feels most intuitive?
4. **Professional Context:** Which style would you prefer in a work environment?
5. **Accessibility:** Which design feels most inclusive and accessible?
6. **Engagement Level:** Which style keeps you most engaged throughout the guide?

## Browser Compatibility

- **Modern Browsers:** Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **Mobile Support:** iOS 12+, Android 8+
- **Graceful Degradation:** Basic functionality without modern CSS features

## Performance Considerations

- **Lightweight:** Each mockup loads quickly (<100KB total)
- **Optimized Animations:** Use CSS transforms for smooth performance
- **Lazy Loading:** Content loads progressively as needed
- **Memory Efficient:** Minimal JavaScript footprint

This collection provides comprehensive style options while maintaining consistency in branding and content, making it ideal for user research and requirements gathering.
