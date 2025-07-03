# Temperature vs Ice Cream Interactive Diagram

An interactive web application that visualizes the relationship between temperature and ice cream sales through synchronized table and graph animations.

## Features

- **Step-by-step Animation**: Data points appear progressively with smooth animations
- **Synchronized Display**: Table rows and graph points are perfectly synchronized
- **Interactive Controls**: Previous, Play, Next, and Reset functionality
- **Progress Tracking**: Visual progress bar with gradient colors matching WWL brand
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Support**: Arrow keys, spacebar, and 'R' for navigation
- **Hover Effects**: Interactive feedback when hovering over data elements

## Technology Stack

- **HTML5**: Semantic structure with SVG graphics
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ class-based architecture
- **Google Fonts**: Patrick Hand font for WWL brand consistency

## WWL Brand Colors

The design follows Microsoft Learn's brand guidelines:

| Color | Hex Code | Usage |
|-------|----------|-------|
| Orange | `#ff5c39` | Primary accent |
| Red | `#f4364c` | Secondary accent |
| Magenta | `#c73ecc` | Tertiary accent |
| Blue | `#0078d4` | Quaternary accent |
| Neutral Gray | `#e8e6df` | Background |
| Blueblack | `#091f2c` | Text and borders |

## Data Set

The visualization displays temperature vs ice cream sales data:

| Temperature | Ice Cream Sold |
|-------------|----------------|
| 21°C        | 93             |
| 17°C        | 87             |
| 11°C        | 56             |
| 26°C        | 102            |
| 22°C        | 103            |
| 19°C        | 101            |
| 31°C        | 127            |

## Controls

- **Previous**: Go back one step
- **Play/Pause**: Auto-advance through all steps
- **Next**: Advance one step forward
- **Reset**: Return to the beginning

### Keyboard Shortcuts

- `←` Left Arrow: Previous step
- `→` Right Arrow: Next step
- `Space`: Play/Pause
- `R`: Reset

## File Structure

```text
wireframe-table-graph/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Animation Details

1. **Table Animation**: Rows fade in from left with highlighting effect
2. **Graph Animation**: Points appear with a "pop" scaling effect
3. **Progress Bar**: Smooth gradient fill representing completion percentage
4. **Synchronized Timing**: 100ms delay between table and graph animations

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Usage

1. Open `index.html` in a web browser
2. Use the control buttons at the bottom to navigate through the data
3. Click on revealed data points or table rows to jump to specific steps
4. Hover over elements for interactive feedback

## Responsive Breakpoints

- **Desktop**: 1200px+ (optimal viewing)
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px (stacked layout)

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- High contrast color combinations
- Scalable SVG graphics
- Clear visual feedback for interactions
