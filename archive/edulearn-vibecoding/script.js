class WaveInterferenceSimulation {
    constructor() {
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas resolution
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Wave sources
        this.sources = [
            {
                x: 200,
                y: 300,
                frequency: 1.5,
                amplitude: 1.0,
                element: document.getElementById('source1')
            },
            {
                x: 600,
                y: 300,
                frequency: 1.2,
                amplitude: 1.0,
                element: document.getElementById('source2')
            }
        ];
        
        // Simulation parameters
        this.time = 0;
        this.isRunning = true;
        this.waveSpeed = 100; // pixels per second
        this.gridSize = 4; // pixel spacing for calculations
        this.maxDistance = 400; // maximum wave travel distance
        
        // Image data for efficient rendering
        this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.animate();
    }
    
    setupEventListeners() {
        // Control sliders
        const controls = [
            { id: 'freq1', property: 'frequency', source: 0, display: 'freq1-value', unit: ' Hz' },
            { id: 'amp1', property: 'amplitude', source: 0, display: 'amp1-value', unit: '' },
            { id: 'freq2', property: 'frequency', source: 1, display: 'freq2-value', unit: ' Hz' },
            { id: 'amp2', property: 'amplitude', source: 1, display: 'amp2-value', unit: '' }
        ];
        
        controls.forEach(control => {
            const slider = document.getElementById(control.id);
            const display = document.getElementById(control.display);
            
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                this.sources[control.source][control.property] = value;
                display.textContent = value.toFixed(1) + control.unit;
            });
        });
        
        // Play/Pause button
        document.getElementById('playPause').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Reset button
        document.getElementById('reset').addEventListener('click', () => {
            this.reset();
        });
    }
    
    setupDragAndDrop() {
        this.sources.forEach((source, index) => {
            let isDragging = false;
            let dragOffset = { x: 0, y: 0 };
            
            source.element.addEventListener('mousedown', (e) => {
                isDragging = true;
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                
                dragOffset.x = e.clientX - rect.left - source.x / scaleX;
                dragOffset.y = e.clientY - rect.top - source.y / scaleY;
                
                source.element.style.zIndex = '20';
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                
                const newX = (e.clientX - rect.left - dragOffset.x) * scaleX;
                const newY = (e.clientY - rect.top - dragOffset.y) * scaleY;
                
                // Keep sources within canvas bounds
                source.x = Math.max(50, Math.min(this.canvas.width - 50, newX));
                source.y = Math.max(50, Math.min(this.canvas.height - 50, newY));
                
                // Update visual position
                const displayX = source.x / scaleX;
                const displayY = source.y / scaleY;
                source.element.style.left = displayX + 'px';
                source.element.style.top = displayY + 'px';
            });
            
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    source.element.style.zIndex = '10';
                }
            });
        });
    }
    
    calculateWaveValue(x, y, time) {
        let totalAmplitude = 0;
        
        this.sources.forEach(source => {
            const dx = x - source.x;
            const dy = y - source.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.maxDistance) {
                // Wave equation: amplitude * sin(2π * (frequency * time - distance / wavelength))
                const wavelength = this.waveSpeed / source.frequency;
                const phase = 2 * Math.PI * (source.frequency * time - distance / wavelength);
                const amplitude = source.amplitude * Math.exp(-distance / 200); // Decay with distance
                
                totalAmplitude += amplitude * Math.sin(phase);
            }
        });
        
        return totalAmplitude;
    }
    
    render() {
        const data = this.imageData.data;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear the image data
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 8;     // R - dark blue background
            data[i + 1] = 12; // G
            data[i + 2] = 21; // B
            data[i + 3] = 255; // A
        }
        
        // Calculate wave interference for each pixel
        for (let y = 0; y < height; y += this.gridSize) {
            for (let x = 0; x < width; x += this.gridSize) {
                const waveValue = this.calculateWaveValue(x, y, this.time);
                
                // Convert wave value to color intensity
                const intensity = Math.max(0, Math.min(1, (waveValue + 2) / 4));
                
                // Create interference pattern colors
                let r, g, b;
                if (intensity > 0.5) {
                    // Constructive interference - bright colors
                    const t = (intensity - 0.5) * 2;
                    r = Math.floor(255 * t);
                    g = Math.floor(255 * t * 0.8);
                    b = Math.floor(255 * (0.3 + t * 0.7));
                } else {
                    // Destructive interference - darker colors
                    const t = intensity * 2;
                    r = Math.floor(50 * t);
                    g = Math.floor(100 * t);
                    b = Math.floor(150 * t);
                }
                
                // Fill the grid area
                for (let dy = 0; dy < this.gridSize && y + dy < height; dy++) {
                    for (let dx = 0; dx < this.gridSize && x + dx < width; dx++) {
                        const pixelIndex = ((y + dy) * width + (x + dx)) * 4;
                        data[pixelIndex] = r;
                        data[pixelIndex + 1] = g;
                        data[pixelIndex + 2] = b;
                        data[pixelIndex + 3] = 255;
                    }
                }
            }
        }
        
        // Draw the image data to canvas
        this.ctx.putImageData(this.imageData, 0, 0);
        
        // Draw wave source indicators with ripples
        this.drawWaveSources();
    }
    
    drawWaveSources() {
        this.sources.forEach((source, index) => {
            const colors = [
                { main: '#ff6b6b', glow: '#ff4757' },
                { main: '#4ecdc4', glow: '#00d2d3' }
            ];
            
            // Draw expanding ripples
            for (let i = 0; i < 3; i++) {
                const rippleRadius = ((this.time * this.waveSpeed * source.frequency + i * 30) % 120) + 10;
                const opacity = 1 - (rippleRadius - 10) / 110;
                
                if (opacity > 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(source.x, source.y, rippleRadius, 0, 2 * Math.PI);
                    this.ctx.strokeStyle = colors[index].glow + Math.floor(opacity * 128).toString(16).padStart(2, '0');
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            }
            
            // Draw source center
            this.ctx.beginPath();
            this.ctx.arc(source.x, source.y, 8, 0, 2 * Math.PI);
            this.ctx.fillStyle = colors[index].main;
            this.ctx.fill();
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }
    
    animate() {
        if (this.isRunning) {
            this.time += 0.016; // ~60 FPS
            this.render();
        }
        requestAnimationFrame(() => this.animate());
    }
    
    togglePlayPause() {
        this.isRunning = !this.isRunning;
        const button = document.getElementById('playPause');
        button.textContent = this.isRunning ? '⏸️ Pause' : '▶️ Play';
    }
    
    reset() {
        this.time = 0;
        
        // Reset source positions
        this.sources[0].x = 200;
        this.sources[0].y = 300;
        this.sources[1].x = 600;
        this.sources[1].y = 300;
        
        // Reset controls
        document.getElementById('freq1').value = 1.5;
        document.getElementById('freq1-value').textContent = '1.5 Hz';
        document.getElementById('amp1').value = 1.0;
        document.getElementById('amp1-value').textContent = '1.0';
        document.getElementById('freq2').value = 1.2;
        document.getElementById('freq2-value').textContent = '1.2 Hz';
        document.getElementById('amp2').value = 1.0;
        document.getElementById('amp2-value').textContent = '1.0';
        
        // Reset source properties
        this.sources[0].frequency = 1.5;
        this.sources[0].amplitude = 1.0;
        this.sources[1].frequency = 1.2;
        this.sources[1].amplitude = 1.0;
        
        // Update visual positions
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        this.sources[0].element.style.left = (this.sources[0].x / scaleX) + 'px';
        this.sources[0].element.style.top = (this.sources[0].y / scaleY) + 'px';
        this.sources[1].element.style.left = (this.sources[1].x / scaleX) + 'px';
        this.sources[1].element.style.top = (this.sources[1].y / scaleY) + 'px';
        
        // Ensure simulation is running
        if (!this.isRunning) {
            this.togglePlayPause();
        }
    }
}

// Performance optimization: Handle window resize
function handleResize() {
    const canvas = document.getElementById('waveCanvas');
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    // Maintain aspect ratio while fitting container
    const aspectRatio = 800 / 600;
    let width = rect.width - 40; // Account for padding
    let height = width / aspectRatio;
    
    if (height > window.innerHeight * 0.6) {
        height = window.innerHeight * 0.6;
        width = height * aspectRatio;
    }
    
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Handle initial resize
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Start simulation
    const simulation = new WaveInterferenceSimulation();
    
    // Add some visual flair
    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'CANVAS') {
            // Create a little ripple effect on click
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            ripple.style.width = '4px';
            ripple.style.height = '4px';
            ripple.style.background = 'rgba(255,255,255,0.8)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'rippleEffect 0.6s ease-out forwards';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                document.body.removeChild(ripple);
            }, 600);
        }
    });
    
    // Add ripple effect animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Add some educational tooltips
const tooltips = {
    'freq1': 'Higher frequency creates more wave peaks per second',
    'freq2': 'Different frequencies create complex interference patterns',
    'amp1': 'Amplitude controls the strength and intensity of the waves',
    'amp2': 'Equal amplitudes create the clearest interference patterns'
};

Object.keys(tooltips).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.title = tooltips[id];
    }
});
