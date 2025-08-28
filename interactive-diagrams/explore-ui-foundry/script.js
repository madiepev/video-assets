// Tutorial data containing explanations for each UI section
const tutorialData = {
    'project-name': {
        title: 'Project Name',
        content: 'This shows your current Azure AI Foundry project name. In this case, it\'s "madiepev-3719". Each project serves as a container for your AI resources, models, and configurations. You can switch between projects using the dropdown menu.'
    },
    'navigation-menu': {
        title: 'Navigation Menu',
        content: 'The left sidebar provides access to all major features: Overview (current page), Model catalog for browsing available AI models, Playgrounds for testing models, AI Services for managing endpoints, and sections for building, observing, and protecting your AI applications.'
    },
    'api-key': {
        title: 'API Key & Endpoints',
        content: 'This section displays your project\'s API key and endpoint information. The API key (shown masked) is used to authenticate your applications when calling Azure OpenAI models. Keep this secure and never share it publicly. The endpoint URL is where your applications will send API requests.'
    },
    'azure-openai': {
        title: 'Azure OpenAI Endpoint',
        content: 'This shows the specific Azure OpenAI endpoint URL for your project. This is the base URL your applications will use to call deployed models like GPT-4, GPT-3.5, or other AI models. The endpoint includes your unique resource identifier and region.'
    },
    'project-details': {
        title: 'Project Details',
        content: 'The right panel shows essential project information including the connection string, subscription details, resource group, and location. This metadata helps you understand where your resources are deployed and how to manage them within your Azure environment.'
    },
    'getting-started': {
        title: 'Getting Started Guide',
        content: 'This bottom section provides a step-by-step workflow: "Define + explore" helps you choose models, "Build + customize" lets you create agents and applications, "Observe + optimize" provides monitoring tools, and "Protect + govern" ensures security and compliance.'
    }
};

// Tutorial state management
class TutorialManager {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = Object.keys(tutorialData).length;
        this.visitedSections = new Set();
        this.sectionOrder = Object.keys(tutorialData);
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgressDisplay();
        this.highlightCurrentSection();
    }

    bindEvents() {
        // Bind click events to hotspots
        document.querySelectorAll('.hotspot').forEach(hotspot => {
            hotspot.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showExplanation(section);
                this.markSectionVisited(section);
            });

            // Add keyboard accessibility
            hotspot.setAttribute('tabindex', '0');
            hotspot.setAttribute('role', 'button');
            hotspot.setAttribute('aria-label', `Learn about ${hotspot.dataset.section.replace('-', ' ')}`);
            
            hotspot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const section = e.currentTarget.dataset.section;
                    this.showExplanation(section);
                    this.markSectionVisited(section);
                }
            });
        });

        // Navigation button events
        document.getElementById('prev-btn').addEventListener('click', () => this.previousStep());
        document.getElementById('next-btn').addEventListener('click', () => this.nextStep());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetTour());
    }

    showExplanation(sectionKey) {
        const data = tutorialData[sectionKey];
        if (!data) return;

        // Remove active class from all hotspots
        document.querySelectorAll('.hotspot').forEach(hotspot => {
            hotspot.classList.remove('active');
        });

        // Add active class to clicked hotspot
        document.querySelector(`[data-section="${sectionKey}"]`).classList.add('active');

        // Update explanation content with animation
        const titleElement = document.getElementById('explanation-title');
        const textElement = document.getElementById('explanation-text');
        const contentElement = document.querySelector('.explanation-content');

        contentElement.classList.add('fade-in');
        
        titleElement.textContent = data.title;
        textElement.textContent = data.content;

        // Update current step based on section
        this.currentStep = this.sectionOrder.indexOf(sectionKey);
        this.updateNavigationButtons();
        
        // Remove animation class after completion
        setTimeout(() => {
            contentElement.classList.remove('fade-in');
        }, 500);
    }

    markSectionVisited(sectionKey) {
        this.visitedSections.add(sectionKey);
        this.updateProgressDisplay();
        
        // Add visual indicator to visited sections
        const hotspot = document.querySelector(`[data-section="${sectionKey}"]`);
        hotspot.classList.add('visited');
    }

    nextStep() {
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            const nextSection = this.sectionOrder[this.currentStep];
            this.showExplanation(nextSection);
            this.markSectionVisited(nextSection);
            this.highlightCurrentSection();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            const prevSection = this.sectionOrder[this.currentStep];
            this.showExplanation(prevSection);
            this.highlightCurrentSection();
        }
    }

    highlightCurrentSection() {
        const currentSection = this.sectionOrder[this.currentStep];
        if (currentSection) {
            // Scroll to the current section if needed
            const hotspot = document.querySelector(`[data-section="${currentSection}"]`);
            if (hotspot) {
                hotspot.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentStep === 0;
        nextBtn.disabled = this.currentStep === this.totalSteps - 1;
    }

    updateProgressDisplay() {
        const progressFill = document.getElementById('progress-fill');
        const currentStepElement = document.getElementById('current-step');
        const totalStepsElement = document.getElementById('total-steps');

        const progress = (this.visitedSections.size / this.totalSteps) * 100;
        progressFill.style.width = `${progress}%`;

        currentStepElement.textContent = this.visitedSections.size;
        totalStepsElement.textContent = this.totalSteps;
    }

    resetTour() {
        this.currentStep = 0;
        this.visitedSections.clear();
        
        // Remove active and visited states
        document.querySelectorAll('.hotspot').forEach(hotspot => {
            hotspot.classList.remove('active', 'visited');
        });

        // Reset to welcome message
        document.getElementById('explanation-title').textContent = 'Welcome to Azure AI Foundry';
        document.getElementById('explanation-text').textContent = 
            'Click on any numbered hotspot above to learn about that feature. Azure AI Foundry is Microsoft\'s comprehensive platform for building, deploying, and managing AI applications.';

        this.updateProgressDisplay();
        this.updateNavigationButtons();
        
        // Add a little animation to show the reset
        const contentElement = document.querySelector('.explanation-content');
        contentElement.classList.add('fade-in');
        setTimeout(() => {
            contentElement.classList.remove('fade-in');
        }, 500);
    }
}

// Auto-tour functionality
class AutoTour {
    constructor(tutorialManager) {
        this.tutorialManager = tutorialManager;
        this.isRunning = false;
        this.intervalId = null;
        this.createAutoTourButton();
    }

    createAutoTourButton() {
        const button = document.createElement('button');
        button.id = 'auto-tour-btn';
        button.textContent = 'Start Auto Tour';
        button.style.cssText = `
            background: #27ae60;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            margin-left: 1rem;
        `;

        button.addEventListener('click', () => this.toggleAutoTour());
        button.addEventListener('mouseenter', () => {
            if (!this.isRunning) {
                button.style.background = '#229954';
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 5px 15px rgba(39, 174, 96, 0.4)';
            }
        });
        button.addEventListener('mouseleave', () => {
            if (!this.isRunning) {
                button.style.background = '#27ae60';
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            }
        });

        document.querySelector('.navigation-buttons').appendChild(button);
    }

    toggleAutoTour() {
        const button = document.getElementById('auto-tour-btn');
        
        if (this.isRunning) {
            this.stopAutoTour();
            button.textContent = 'Start Auto Tour';
            button.style.background = '#27ae60';
        } else {
            this.startAutoTour();
            button.textContent = 'Stop Auto Tour';
            button.style.background = '#e74c3c';
        }
    }

    startAutoTour() {
        this.isRunning = true;
        this.tutorialManager.resetTour();
        
        this.intervalId = setInterval(() => {
            if (this.tutorialManager.currentStep < this.tutorialManager.totalSteps - 1) {
                this.tutorialManager.nextStep();
            } else {
                this.stopAutoTour();
                document.getElementById('auto-tour-btn').textContent = 'Start Auto Tour';
                document.getElementById('auto-tour-btn').style.background = '#27ae60';
            }
        }, 4000); // 4 seconds per step
    }

    stopAutoTour() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#explanation-panel';
    skipLink.textContent = 'Skip to explanation panel';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999;
        padding: 1em;
        background: white;
        color: #333;
        text-decoration: none;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.left = '6px';
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels and descriptions
    document.querySelector('.screenshot-container').setAttribute('role', 'img');
    document.querySelector('.screenshot-container').setAttribute('aria-label', 'Azure AI Foundry interface with interactive hotspots');
    document.querySelector('.explanation-panel').setAttribute('id', 'explanation-panel');
    document.querySelector('.explanation-panel').setAttribute('role', 'region');
    document.querySelector('.explanation-panel').setAttribute('aria-label', 'Feature explanation');
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Only activate shortcuts when not focused on interactive elements
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;

        switch(e.key) {
            case 'ArrowRight':
            case 'n':
                e.preventDefault();
                tutorialManager.nextStep();
                break;
            case 'ArrowLeft':
            case 'p':
                e.preventDefault();
                tutorialManager.previousStep();
                break;
            case 'r':
                e.preventDefault();
                tutorialManager.resetTour();
                break;
            case 'h':
            case '?':
                e.preventDefault();
                showHelpDialog();
                break;
        }
    });
}

function showHelpDialog() {
    const helpText = `
Keyboard Shortcuts:
• Arrow Right or 'n': Next step
• Arrow Left or 'p': Previous step  
• 'r': Reset tour
• 'h' or '?': Show this help
• Enter/Space on hotspots: View explanation
    `;
    
    alert(helpText);
}

// Initialize the tutorial when the page loads
let tutorialManager;
let autoTour;

document.addEventListener('DOMContentLoaded', () => {
    tutorialManager = new TutorialManager();
    autoTour = new AutoTour(tutorialManager);
    enhanceAccessibility();
    setupKeyboardShortcuts();
    
    // Add a welcome message with instructions
    console.log('Azure AI Foundry Tutorial loaded! Use arrow keys to navigate or click numbered hotspots.');
});

// Handle window resize to maintain highlight positions
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Re-calculate hotspot positions if needed
        // This could be enhanced to dynamically adjust hotspot positions
        console.log('Window resized - hotspots may need repositioning');
    }, 250);
});
