# Prompt for GitHub Copilot

I want to create an **interactive, step-by-step diagram** explaining Azure Storage Account services. It will be deployed as a simple HTML/CSS/JavaScript site (no frameworks) and hosted on GitHub Pages.

## 🎯 GOAL:
Create a linear walkthrough of 7 steps that visually explain the components of Azure Storage Accounts:
1. Storage Account (definition)
2. Standard vs Premium tiers
3. Storage services (Blob, File Shares, Queues, Tables)
4. Containers inside Blob Storage
5. Types of Blobs (Block, Page, Append)
6. Access Tiers (Hot, Cool, Cold, Archive)
7. Full overview

Each step should:
- Show a visual element (e.g. SVG, div boxes, simple icons)
- Include a short explanation
- Highlight or animate only what is relevant in that step
- Include a “Next” button to go to the next step (and “Previous” if possible)

## 🔧 TECH CONSTRAINTS:
- Pure HTML/CSS/JS (no React or other frameworks)
- Use local assets or inline SVG where needed
- Mobile-friendly layout preferred
- Should work on GitHub Pages (static hosting)

## 💡 STYLE GUIDELINES:
- Light, playful style (similar to hand-drawn or sketch)
- Use simple icons or shapes to represent concepts (boxes for containers, flames for hot tier, waves for cool tier, etc.)
- Use arrows or dashed lines to show relationships
- Minimize clutter — each step shows only the relevant concept

## 🔄 BONUS FEATURES (if possible):
- Hover tooltips for explanations
- Animated transitions between steps (slide, fade)
- Step indicator (e.g. "Step 3 of 7")

Please generate the following:
- index.html: Base layout and steps
- styles.css: Styling for visuals, layout, and transitions
- script.js: JavaScript to handle step navigation and interactivity
