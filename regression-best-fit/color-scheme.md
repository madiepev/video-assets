# WWL Brand Color Scheme for Best Fit Line Interactive

## Typography

- **Primary Font**: Patrick Hand (Google Fonts)
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');`
- **CSS Declaration**: `font-family: 'Patrick Hand', cursive;`

## Color Palette

### Primary Colors

```css
:root {
    /* Orange Palette */
    --orange-light: #ffa38b;
    --orange-mid: #ff5c39;
    --orange-dark: #73391d;
    
    /* Red Palette */
    --red-light: #ffb3bb;
    --red-mid: #f4364c;
    --red-dark: #73262f;
    
    /* Magenta Palette */
    --magenta-light: #cd9bcf;
    --magenta-mid: #c73ecc;
    --magenta-dark: #702573;
    
    /* Blue Palette */
    --blue-light: #8dc8e8;
    --blue-mid: #0078d4;
    --blue-dark: #2a446f;
    
    /* Neutral Colors */
    --neutral-gray: #e8e6df;    /* Background color */
    --blueblack: #091f2c;       /* Primary text color */
    --off-white: #f4f3f5;       /* Secondary background */
    --black: #000000;           /* Pure black for lines/text */
    --white: #ffffff;           /* Pure white */
}
```

## Usage Guidelines for Best Fit Line Interactive

### Background

- **Primary Background**: `var(--neutral-gray)` (#e8e6df)
- Use for main page background to maintain WWL brand consistency

### Text Colors

- **Primary Text**: `var(--blueblack)` (#091f2c) or `var(--black)` (#000000)
- **Secondary Text**: `var(--blue-dark)` (#2a446f) for less prominent text
- **All text must use Patrick Hand font**

### Line Colors

- **Default Line**: `var(--black)` (#000000) for high contrast
- **User Adjustable Line**: `var(--blue-mid)` (#0078d4) for interactive elements
- **Best Fit Line**: `var(--red-mid)` (#f4364c) to highlight the optimal solution
- **Grid Lines/Axes**: `var(--blueblack)` (#091f2c) or light gray for subtle reference

### Data Points

- **Primary Data Points**: `var(--orange-mid)` (#ff5c39)
- **Secondary/Highlighted Points**: `var(--magenta-mid)` (#c73ecc)
- **Error Indicators**: `var(--red-light)` (#ffb3bb) for residual lines

### Interactive Elements

- **Sliders/Controls**: `var(--blue-mid)` (#0078d4)
- **Buttons**: `var(--orange-mid)` (#ff5c39)
- **Button Hover**: `var(--orange-dark)` (#73391d)
- **Control Panel Background**: `var(--white)` (#ffffff)

### Error/Feedback Visualization

- **Good Fit (Low Error)**: `var(--blue-light)` (#8dc8e8)
- **Poor Fit (High Error)**: `var(--red-light)` (#ffb3bb)
- **Residual Lines**: `var(--red-mid)` (#f4364c) with reduced opacity

## Implementation Example

```css
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

body {
    font-family: 'Patrick Hand', cursive;
    background-color: var(--neutral-gray);
    color: var(--blueblack);
}

.regression-line {
    stroke: var(--blue-mid);
    stroke-width: 2px;
}

.best-fit-line {
    stroke: var(--red-mid);
    stroke-width: 3px;
}

.data-point {
    fill: var(--orange-mid);
    stroke: var(--black);
    stroke-width: 1px;
}

.residual-line {
    stroke: var(--red-mid);
    stroke-width: 1px;
    opacity: 0.7;
}

.axis-line {
    stroke: var(--blueblack);
    stroke-width: 1px;
}

.grid-line {
    stroke: var(--blueblack);
    stroke-width: 0.5px;
    opacity: 0.3;
}
```

## Accessibility Considerations

### Color Contrast

- **Background to Text**: #e8e6df to #091f2c provides excellent contrast
- **Background to Black**: #e8e6df to #000000 provides maximum contrast
- All color combinations meet WCAG AA standards

### Color-Blind Friendly

- Use different line styles (solid, dashed, dotted) in addition to colors
- Ensure shape/position differences supplement color coding
- Test with color-blind simulators

## Brand Consistency

This color scheme maintains consistency with other WWL educational materials in the repository while providing clear visual hierarchy for the interactive best fit line demonstration.
