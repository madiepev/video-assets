// Information content for each hotspot
const infoContent = {
    'app-switcher': {
        title: 'Microsoft 365 App Switcher',
        content: `
            <p>The <span class="highlight">App Switcher</span> allows you to navigate between different Microsoft 365 applications seamlessly.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Quick access to all Microsoft 365 apps</li>
                <li>Maintains context across applications</li>
                <li>Single sign-on experience</li>
                <li>Recently used apps appear first</li>
            </ul>
            <p><strong>Best Practice:</strong> Use this to switch between Fabric and other Microsoft tools like Teams, Outlook, or PowerBI without losing your session.</p>
        `
    },
    'search': {
        title: 'Universal Search',
        content: `
            <p>The <span class="highlight">Search functionality</span> works across all workspaces and artifact types in Microsoft Fabric.</p>
            <p><strong>Search Capabilities:</strong></p>
            <ul>
                <li>Find notebooks, datasets, pipelines, and reports</li>
                <li>Search across workspace names and descriptions</li>
                <li>Filter by artifact type, owner, or recent activity</li>
                <li>Smart suggestions based on your usage patterns</li>
            </ul>
            <p><strong>Pro Tip:</strong> Use specific keywords related to your project or data source names for more accurate results.</p>
        `
    },
    'trial': {
        title: 'Free Trial Information',
        content: `
            <p>The <span class="highlight">Free Trial</span> indicator shows your current trial status and remaining days.</p>
            <p><strong>Trial Benefits:</strong></p>
            <ul>
                <li>Access to all Fabric experiences</li>
                <li>Limited compute and storage capacity</li>
                <li>Ability to create and share workspaces</li>
                <li>Full feature access for evaluation</li>
            </ul>
            <p><strong>Important:</strong> Monitor your trial days and plan for license conversion to avoid data loss.</p>
            <p><strong>Feedback:</strong> Use this area to provide feedback to the Microsoft Fabric team and vote on feature requests.</p>
        `
    },
    'browse': {
        title: 'Browse Section',
        content: `
            <p>The <span class="highlight">Browse</span> section is your gateway to discovering and organizing content in Fabric.</p>
            <p><strong>Browse Features:</strong></p>
            <ul>
                <li><strong>Recent Items:</strong> Quickly access your recently viewed artifacts</li>
                <li><strong>Favorites:</strong> Star important items for easy retrieval</li>
                <li><strong>Shared with me:</strong> View items others have shared with you</li>
                <li><strong>Filter options:</strong> Sort by type, date, or owner</li>
            </ul>
            <p><strong>Best Practice:</strong> Regularly favorite items you're actively working on to build a personalized quick-access library.</p>
        `
    },
    'workspaces': {
        title: 'Workspaces Navigation',
        content: `
            <p><span class="highlight">Workspaces</span> are collaborative environments where teams organize and work with data artifacts.</p>
            <p><strong>Workspace Types:</strong></p>
            <ul>
                <li><strong>Personal:</strong> Your private workspace for experimentation</li>
                <li><strong>Shared:</strong> Team workspaces with role-based access</li>
                <li><strong>Premium:</strong> Enhanced workspaces with additional features</li>
            </ul>
            <p><strong>Navigation Tips:</strong></p>
            <ul>
                <li>Pin frequently used workspaces to the top</li>
                <li>Use the "Go to current" option to return to your active workspace</li>
                <li>Switch contexts before selecting workspaces for better organization</li>
            </ul>
        `
    },
    'artifacts': {
        title: 'Open Artifacts',
        content: `
            <p><span class="highlight">Open Artifacts</span> section shows items that are currently active or recently opened in your browser tabs.</p>
            <p><strong>Artifact Types:</strong></p>
            <ul>
                <li><strong>Notebooks:</strong> Interactive data science environments</li>
                <li><strong>Datasets:</strong> Structured data collections</li>
                <li><strong>Reports:</strong> Visual analytics dashboards</li>
                <li><strong>Pipelines:</strong> Data processing workflows</li>
                <li><strong>Models:</strong> Machine learning models</li>
            </ul>
            <p><strong>Performance Tip:</strong> Close unused artifacts to free up browser resources and maintain better performance.</p>
        `
    },
    'experiences': {
        title: 'Product Experiences',
        content: `
            <p><span class="highlight">Product Experiences</span> represent different functional areas within Microsoft Fabric.</p>
            <p><strong>Available Experiences:</strong></p>
            <ul>
                <li><strong>Data Engineering:</strong> Build and manage data pipelines</li>
                <li><strong>Data Science:</strong> Create and deploy ML models</li>
                <li><strong>Data Factory:</strong> Orchestrate data movement and transformation</li>
                <li><strong>Real-Time Analytics:</strong> Process streaming data</li>
                <li><strong>Power BI:</strong> Create reports and dashboards</li>
            </ul>
            <p><strong>Context Switching:</strong> Select the appropriate experience based on your current task to access relevant tools and templates.</p>
        `
    },
    'ui-context': {
        title: 'Dynamic UI Context',
        content: `
            <p>The <span class="highlight">UI Context</span> changes dynamically based on your selected experience and current activity.</p>
            <p><strong>Context-Aware Features:</strong></p>
            <ul>
                <li>Tool ribbons adapt to your selected experience</li>
                <li>Templates and samples relevant to your work appear</li>
                <li>Quick actions change based on artifact types</li>
                <li>Help content is contextually filtered</li>
            </ul>
            <p><strong>Learning Tip:</strong> Pay attention to how the interface adapts as you switch between different experiences - this helps you understand the platform's organization.</p>
            <p><strong>Multiple Views:</strong> The interface can display workspace home, notebook experience, or data flows depending on your current context.</p>
        `
    }
};

// DOM elements
const hotspots = document.querySelectorAll('.hotspot');
const infoPanel = document.getElementById('infoPanel');
const infoDetails = document.getElementById('infoDetails');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

// Initialize the interactive diagram
function initializeInteractivity() {
    // Add click event listeners to hotspots
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', handleHotspotClick);
        hotspot.addEventListener('keypress', handleHotspotKeypress);
        
        // Make hotspots focusable
        hotspot.setAttribute('tabindex', '0');
        hotspot.setAttribute('role', 'button');
        
        // Add hover effects
        hotspot.addEventListener('mouseenter', handleHotspotHover);
        hotspot.addEventListener('mouseleave', handleHotspotLeave);
    });
    
    // Close panel events
    closeBtn.addEventListener('click', closeInfoPanel);
    overlay.addEventListener('click', closeInfoPanel);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);
    
    // Responsive image handling
    handleResponsiveImage();
    window.addEventListener('resize', handleResponsiveImage);
}

// Handle hotspot clicks
function handleHotspotClick(event) {
    const infoKey = event.currentTarget.getAttribute('data-info');
    showInfoPanel(infoKey);
    
    // Analytics tracking (if needed)
    trackInteraction('hotspot_click', infoKey);
}

// Handle hotspot keyboard navigation
function handleHotspotKeypress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleHotspotClick(event);
    }
}

// Handle hotspot hover
function handleHotspotHover(event) {
    const indicator = event.currentTarget.querySelector('.hotspot-indicator');
    indicator.style.animationPlayState = 'paused';
    indicator.style.transform = 'scale(1.3)';
    
    // Show tooltip (optional)
    showTooltip(event.currentTarget);
}

// Handle hotspot leave
function handleHotspotLeave(event) {
    const indicator = event.currentTarget.querySelector('.hotspot-indicator');
    indicator.style.animationPlayState = 'running';
    indicator.style.transform = 'scale(1)';
    
    // Hide tooltip
    hideTooltip();
}

// Show information panel
function showInfoPanel(infoKey) {
    const content = infoContent[infoKey];
    if (!content) return;
    
    // Populate content
    infoDetails.innerHTML = `
        <h3>${content.title}</h3>
        ${content.content}
    `;
    
    // Show panel with animation
    overlay.classList.add('active');
    infoPanel.classList.add('active');
    
    // Focus management for accessibility
    infoPanel.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close information panel
function closeInfoPanel() {
    overlay.classList.remove('active');
    infoPanel.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Return focus to the last clicked hotspot
    const lastClickedHotspot = document.querySelector('.hotspot:focus');
    if (lastClickedHotspot) {
        lastClickedHotspot.focus();
    }
}

// Handle keyboard navigation
function handleKeydown(event) {
    // Close panel with Escape key
    if (event.key === 'Escape' && infoPanel.classList.contains('active')) {
        closeInfoPanel();
        return;
    }
    
    // Navigate between hotspots with arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        navigateHotspots(event.key);
    }
}

// Navigate between hotspots
function navigateHotspots(direction) {
    const currentFocus = document.activeElement;
    const currentIndex = Array.from(hotspots).indexOf(currentFocus);
    
    if (currentIndex === -1) {
        // No hotspot focused, focus the first one
        hotspots[0].focus();
        return;
    }
    
    let nextIndex;
    switch (direction) {
        case 'ArrowUp':
        case 'ArrowLeft':
            nextIndex = currentIndex > 0 ? currentIndex - 1 : hotspots.length - 1;
            break;
        case 'ArrowDown':
        case 'ArrowRight':
            nextIndex = currentIndex < hotspots.length - 1 ? currentIndex + 1 : 0;
            break;
    }
    
    hotspots[nextIndex].focus();
}

// Handle responsive image and hotspot positioning
function handleResponsiveImage() {
    const image = document.getElementById('interfaceImage');
    const wrapper = image.parentElement;
    
    // Ensure hotspots scale with image
    const imageRect = image.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // Calculate scale factor
    const scaleX = imageRect.width / image.naturalWidth;
    const scaleY = imageRect.height / image.naturalHeight;
    
    // Apply scaling to hotspots if needed
    // This could be enhanced based on specific requirements
}

// Show tooltip (optional enhancement)
function showTooltip(hotspot) {
    const infoKey = hotspot.getAttribute('data-info');
    const content = infoContent[infoKey];
    
    // Create or update tooltip
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(tooltip);
    }
    
    tooltip.textContent = content.title;
    
    // Position tooltip
    const rect = hotspot.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    tooltip.style.opacity = '1';
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
    }
}

// Analytics tracking (placeholder)
function trackInteraction(action, element) {
    // Implement analytics tracking here
    console.log(`Analytics: ${action} on ${element}`);
    
    // Example: Google Analytics 4
    // gtag('event', action, {
    //     element_type: 'hotspot',
    //     element_id: element
    // });
}

// Preload content and initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if image is loaded
    const image = document.getElementById('interfaceImage');
    
    if (image.complete) {
        initializeInteractivity();
    } else {
        image.addEventListener('load', initializeInteractivity);
    }
    
    // Add loading indicator
    image.addEventListener('loadstart', function() {
        document.body.classList.add('loading');
    });
    
    image.addEventListener('load', function() {
        document.body.classList.remove('loading');
    });
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showInfoPanel,
        closeInfoPanel,
        handleHotspotClick,
        infoContent
    };
}
