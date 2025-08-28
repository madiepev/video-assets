// Low-Fidelity Wireframe JavaScript

// Component information for the wireframe
const wireframeContent = {
    '1': {
        title: 'App Switcher Component',
        content: `
            <h4>Purpose</h4>
            <p>Primary navigation element allowing users to switch between different applications in the ecosystem.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>Grid or list view of available apps</li>
                <li>Quick access to recently used applications</li>
                <li>Search within app directory</li>
                <li>User personalization options</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Position:</span> Top-left for easy thumb access on mobile</li>
                <li><span class="highlight-wireframe">Size:</span> 40-48px touch target minimum</li>
                <li><span class="highlight-wireframe">Behavior:</span> Dropdown or overlay panel</li>
            </ul>
        `
    },
    '2': {
        title: 'Search Bar Component',
        content: `
            <h4>Purpose</h4>
            <p>Global search functionality enabling users to find content across all workspaces and data sources.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>Real-time search suggestions</li>
                <li>Filter by content type, date, author</li>
                <li>Recent searches memory</li>
                <li>Scoped search within current workspace</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Width:</span> Expandable, 300-400px optimal</li>
                <li><span class="highlight-wireframe">Placeholder:</span> Contextual hints based on current view</li>
                <li><span class="highlight-wireframe">Shortcuts:</span> Keyboard shortcut (Ctrl+K) support</li>
            </ul>
        `
    },
    '3': {
        title: 'Account Information',
        content: `
            <h4>Purpose</h4>
            <p>User account management and system status information display.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>User profile and settings access</li>
                <li>Trial status or subscription info</li>
                <li>Notification center</li>
                <li>Help and feedback options</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Visual:</span> Avatar or initials display</li>
                <li><span class="highlight-wireframe">Status:</span> Clear indication of trial days remaining</li>
                <li><span class="highlight-wireframe">Accessibility:</span> Dropdown menu with keyboard navigation</li>
            </ul>
        `
    },
    '4': {
        title: 'Browse Navigation',
        content: `
            <h4>Purpose</h4>
            <p>Content discovery and organization system for easy access to user's work items.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>Recent items chronological list</li>
                <li>Favorited content quick access</li>
                <li>Shared content from other users</li>
                <li>Content type filtering</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Layout:</span> Collapsible sections for space efficiency</li>
                <li><span class="highlight-wireframe">Icons:</span> Clear visual indicators for content types</li>
                <li><span class="highlight-wireframe">Interaction:</span> Single-click to open, right-click for options</li>
            </ul>
        `
    },
    '5': {
        title: 'Workspace Selector',
        content: `
            <h4>Purpose</h4>
            <p>Workspace management interface allowing users to switch between different project environments.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>List of available workspaces</li>
                <li>Workspace creation options</li>
                <li>Permission level indicators</li>
                <li>Pin frequently used workspaces</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Hierarchy:</span> Personal vs shared workspace grouping</li>
                <li><span class="highlight-wireframe">Status:</span> Active workspace highlighting</li>
                <li><span class="highlight-wireframe">Actions:</span> Context menu for workspace management</li>
            </ul>
        `
    },
    '6': {
        title: 'Breadcrumb Navigation',
        content: `
            <h4>Purpose</h4>
            <p>Hierarchical navigation showing user's current location within the application structure.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>Click-to-navigate to parent levels</li>
                <li>Current page/view identification</li>
                <li>Path history for complex navigation</li>
                <li>Truncation for long paths</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Separators:</span> Clear visual hierarchy (> or /)</li>
                <li><span class="highlight-wireframe">Responsive:</span> Collapse middle items on mobile</li>
                <li><span class="highlight-wireframe">Styling:</span> Last item non-clickable, others as links</li>
            </ul>
        `
    },
    '7': {
        title: 'Content Item Cards',
        content: `
            <h4>Purpose</h4>
            <p>Individual content representation showing key information and available actions.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>Content type identification (icon/color)</li>
                <li>Metadata display (date, author, status)</li>
                <li>Quick actions (open, share, delete)</li>
                <li>Preview on hover/selection</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Size:</span> Consistent card dimensions for grid layout</li>
                <li><span class="highlight-wireframe">States:</span> Default, hover, selected, loading</li>
                <li><span class="highlight-wireframe">Actions:</span> Progressive disclosure of action menu</li>
            </ul>
        `
    },
    '8': {
        title: 'Context Panel',
        content: `
            <h4>Purpose</h4>
            <p>Dynamic side panel providing contextual information and actions based on current selection.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>Item properties and metadata</li>
                <li>Version history and changes</li>
                <li>Sharing and collaboration options</li>
                <li>Related content suggestions</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Responsive:</span> Collapsible on smaller screens</li>
                <li><span class="highlight-wireframe">Content:</span> Tabbed interface for different info types</li>
                <li><span class="highlight-wireframe">State:</span> Empty state when no selection</li>
            </ul>
        `
    },
    '9': {
        title: 'Experience Selector',
        content: `
            <h4>Purpose</h4>
            <p>Mode switcher allowing users to change the application context for different workflows.</p>
            
            <h4>Functionality</h4>
            <ul>
                <li>Switch between different product experiences</li>
                <li>Context-appropriate tool sets</li>
                <li>Preserve work across experience changes</li>
                <li>Role-based experience filtering</li>
            </ul>
            
            <h4>UI Considerations</h4>
            <ul>
                <li><span class="highlight-wireframe">Layout:</span> Horizontal tabs or segmented control</li>
                <li><span class="highlight-wireframe">Indication:</span> Clear active state visualization</li>
                <li><span class="highlight-wireframe">Transition:</span> Smooth loading between experiences</li>
            </ul>
        `
    }
};

// DOM Elements
const hotspots = document.querySelectorAll('[data-hotspot]');
const infoPanel = document.getElementById('infoPanel');
const panelTitle = document.getElementById('panelTitle');
const panelContent = document.getElementById('panelContent');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

// Initialize wireframe interactions
function initWireframe() {
    // Add click listeners to hotspots
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', handleHotspotClick);
        hotspot.addEventListener('keypress', handleKeyPress);
        
        // Make focusable
        hotspot.setAttribute('tabindex', '0');
        hotspot.setAttribute('role', 'button');
        hotspot.setAttribute('aria-label', `Explore component ${hotspot.dataset.hotspot}`);
    });
    
    // Panel close events
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Add loading animation to numbers
    animateHotspots();
}

// Handle hotspot clicks
function handleHotspotClick(event) {
    const hotspotNumber = event.currentTarget.dataset.hotspot;
    showInfoPanel(hotspotNumber);
    
    // Track interaction
    console.log(`Wireframe interaction: Hotspot ${hotspotNumber}`);
}

// Handle keyboard interaction
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleHotspotClick(event);
    }
}

// Show information panel
function showInfoPanel(hotspotNumber) {
    const content = wireframeContent[hotspotNumber];
    if (!content) return;
    
    // Update panel content
    panelTitle.textContent = content.title;
    panelContent.innerHTML = content.content;
    
    // Show panel
    overlay.classList.add('active');
    infoPanel.classList.add('active');
    
    // Focus management
    closeBtn.focus();
    
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
}

// Close information panel
function closePanel() {
    overlay.classList.remove('active');
    infoPanel.classList.remove('active');
    
    // Restore scroll
    document.body.style.overflow = 'auto';
    
    // Return focus
    const lastActiveHotspot = document.querySelector('[data-hotspot]:focus');
    if (lastActiveHotspot) {
        lastActiveHotspot.focus();
    }
}

// Handle keyboard navigation
function handleKeyDown(event) {
    // Close panel with Escape
    if (event.key === 'Escape' && infoPanel.classList.contains('active')) {
        closePanel();
        return;
    }
    
    // Navigate hotspots with arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        navigateHotspots(event.key);
        event.preventDefault();
    }
}

// Navigate between hotspots
function navigateHotspots(direction) {
    const focusedElement = document.activeElement;
    const currentIndex = Array.from(hotspots).indexOf(focusedElement);
    
    if (currentIndex === -1) {
        hotspots[0].focus();
        return;
    }
    
    let nextIndex;
    switch (direction) {
        case 'ArrowLeft':
        case 'ArrowUp':
            nextIndex = currentIndex > 0 ? currentIndex - 1 : hotspots.length - 1;
            break;
        case 'ArrowRight':
        case 'ArrowDown':
            nextIndex = currentIndex < hotspots.length - 1 ? currentIndex + 1 : 0;
            break;
    }
    
    hotspots[nextIndex].focus();
}

// Animate hotspot numbers
function animateHotspots() {
    const numbers = document.querySelectorAll('.hotspot-number');
    
    numbers.forEach((number, index) => {
        // Stagger the animation start
        setTimeout(() => {
            number.style.animationDelay = `${index * 0.2}s`;
        }, index * 100);
    });
}

// Add visual feedback for interactions
function addVisualFeedback() {
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', () => {
            const number = hotspot.querySelector('.hotspot-number');
            number.style.animationPlayState = 'paused';
            number.style.transform = 'scale(1.3)';
        });
        
        hotspot.addEventListener('mouseleave', () => {
            const number = hotspot.querySelector('.hotspot-number');
            number.style.animationPlayState = 'running';
            number.style.transform = 'scale(1)';
        });
        
        hotspot.addEventListener('focus', () => {
            const box = hotspot.querySelector('.placeholder-box');
            box.style.borderColor = '#007bff';
            box.style.background = '#e8f4fd';
        });
        
        hotspot.addEventListener('blur', () => {
            const box = hotspot.querySelector('.placeholder-box');
            box.style.borderColor = '#666';
            box.style.background = '#fafafa';
        });
    });
}

// Create tour mode
function createTour() {
    let currentStep = 0;
    const totalSteps = hotspots.length;
    
    function nextStep() {
        if (currentStep < totalSteps) {
            const hotspot = hotspots[currentStep];
            hotspot.scrollIntoView({ behavior: 'smooth', block: 'center' });
            hotspot.focus();
            
            // Auto-open info panel
            setTimeout(() => {
                handleHotspotClick({ currentTarget: hotspot });
            }, 500);
            
            currentStep++;
        }
    }
    
    function startTour() {
        currentStep = 0;
        nextStep();
    }
    
    // Add tour button
    const tourBtn = document.createElement('button');
    tourBtn.textContent = '🎯 Start Guided Tour';
    tourBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,123,255,0.3);
    `;
    
    tourBtn.addEventListener('click', startTour);
    document.body.appendChild(tourBtn);
    
    return { startTour, nextStep };
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initWireframe();
    addVisualFeedback();
    createTour();
    
    // Add some demo interactions
    console.log('Wireframe initialized with', hotspots.length, 'interactive components');
    
    // Performance monitoring
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    hotspots.forEach(hotspot => {
        hotspot.style.opacity = '0';
        hotspot.style.transform = 'translateY(20px)';
        hotspot.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(hotspot);
    });
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        wireframeContent,
        showInfoPanel,
        closePanel,
        handleHotspotClick
    };
}
