// K-Means Clustering Interactive Diagram
class KMeansVisualization {
    constructor() {
        this.canvas = document.getElementById('clusterCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentStep = 1;
        this.totalSteps = 6;
        this.isPlaying = true;
        this.animationSpeed = 2000; // 2 seconds per step
        this.animationTimer = null;
        
        // Color scheme
        this.colors = {
            background: '#ffffff',
            grid: '#e0e0e0',
            axis: '#323130',
            centroid: '#0078d4',
            cluster1: '#ff5c39',
            cluster2: '#c73ecc',
            cluster3: '#f4364c',
            text: '#323130'
        };
        
        // Data points (flower positions on grid)
        this.dataPoints = [
            { x: 150, y: 120, cluster: null, originalCluster: null },
            { x: 200, y: 100, cluster: null, originalCluster: null },
            { x: 180, y: 150, cluster: null, originalCluster: null },
            { x: 400, y: 200, cluster: null, originalCluster: null },
            { x: 450, y: 180, cluster: null, originalCluster: null },
            { x: 420, y: 240, cluster: null, originalCluster: null },
            { x: 600, y: 350, cluster: null, originalCluster: null },
            { x: 650, y: 320, cluster: null, originalCluster: null },
            { x: 620, y: 380, cluster: null, originalCluster: null }
        ];
        
        // Centroids
        this.centroids = [
            { x: 100, y: 200, finalX: 177, finalY: 123, color: this.colors.cluster1 },
            { x: 300, y: 300, finalX: 423, finalY: 207, color: this.colors.cluster2 },
            { x: 500, y: 150, finalX: 623, finalY: 350, color: this.colors.cluster3 }
        ];
        
        // Step descriptions
        this.stepInfo = {
            1: {
                title: "Plot Unclustered Data Points",
                description: "Display flower icons at specific grid coordinates representing unlabeled data points."
            },
            2: {
                title: "Add Initial Centroids",
                description: "Place 3 randomly positioned blue circles representing cluster centroids."
            },
            3: {
                title: "Assign Data Points to Nearest Centroid",
                description: "Color areas around each centroid to show initial grouping based on proximity."
            },
            4: {
                title: "Move Centroids to Cluster Means",
                description: "Centroids shift to the average position of their assigned points."
            },
            5: {
                title: "Reassign Points to New Clusters",
                description: "Data points visually regroup based on updated centroid positions."
            },
            6: {
                title: "Final Convergence",
                description: "Clusters stabilize with consistent centroids and point groupings."
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAnimation();
        this.draw();
    }
    
    setupEventListeners() {
        document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('prevBtn').addEventListener('click', () => this.previousStep());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        // Adjust canvas size for mobile
        const container = this.canvas.parentElement;
        const maxWidth = Math.min(800, container.clientWidth - 40);
        const maxHeight = Math.min(600, window.innerHeight * 0.6);
        
        if (window.innerWidth <= 768) {
            this.canvas.width = maxWidth;
            this.canvas.height = maxHeight;
        }
        
        this.draw();
    }
    
    startAnimation() {
        if (this.isPlaying) {
            this.animationTimer = setInterval(() => {
                this.nextStep();
            }, this.animationSpeed);
        }
    }
    
    stopAnimation() {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('playPauseBtn');
        const icon = document.getElementById('playPauseIcon');
        
        if (this.isPlaying) {
            btn.innerHTML = '<span id="playPauseIcon">⏸️</span> Pause';
            this.startAnimation();
        } else {
            btn.innerHTML = '<span id="playPauseIcon">▶️</span> Play';
            this.stopAnimation();
        }
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        } else {
            this.currentStep = 1; // Loop back to beginning
        }
        this.updateUI();
        this.draw();
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        } else {
            this.currentStep = this.totalSteps; // Loop to end
        }
        this.updateUI();
        this.draw();
    }
    
    reset() {
        this.currentStep = 1;
        this.updateUI();
        this.draw();
    }
    
    updateUI() {
        document.getElementById('stepCounter').textContent = `Step ${this.currentStep}/${this.totalSteps}`;
        document.getElementById('stepTitle').textContent = this.stepInfo[this.currentStep].title;
        document.getElementById('stepDescription').textContent = this.stepInfo[this.currentStep].description;
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const progressPercent = (this.currentStep / this.totalSteps) * 100;
        progressFill.style.width = `${progressPercent}%`;
        
        // Update button states
        document.getElementById('prevBtn').disabled = false;
        document.getElementById('nextBtn').disabled = false;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid and axes
        this.drawGrid();
        this.drawAxes();
        
        // Draw based on current step
        switch (this.currentStep) {
            case 1:
                this.drawDataPoints();
                break;
            case 2:
                this.drawDataPoints();
                this.drawCentroids(false);
                break;
            case 3:
                this.drawClusterRegions(false);
                this.drawDataPoints();
                this.drawCentroids(false);
                this.assignPointsToClusters(false);
                break;
            case 4:
                this.drawClusterRegions(false);
                this.drawDataPoints();
                this.assignPointsToClusters(false);
                this.drawCentroids(true); // Show movement
                break;
            case 5:
                this.drawClusterRegions(true);
                this.drawDataPoints();
                this.assignPointsToClusters(true);
                this.drawCentroids(true);
                break;
            case 6:
                this.drawClusterRegions(true);
                this.drawDataPoints();
                this.assignPointsToClusters(true);
                this.drawCentroids(true);
                this.drawConvergenceIndicator();
                break;
        }
    }
    
    drawGrid() {
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let x = 50; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 50);
            this.ctx.lineTo(x, this.canvas.height - 50);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = 50; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(50, y);
            this.ctx.lineTo(this.canvas.width - 50, y);
            this.ctx.stroke();
        }
    }
    
    drawAxes() {
        this.ctx.strokeStyle = this.colors.axis;
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = this.colors.text;
        this.ctx.font = 'bold 24px Segoe UI';
        
        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(50, this.canvas.height - 50);
        this.ctx.lineTo(this.canvas.width - 30, this.canvas.height - 50);
        this.ctx.stroke();
        
        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(50, this.canvas.height - 50);
        this.ctx.lineTo(50, 30);
        this.ctx.stroke();
        
        // Axis labels with larger font and icons
        this.ctx.fillText('X₂ 🌸', this.canvas.width - 100, this.canvas.height - 20);
        this.ctx.save();
        this.ctx.translate(20, 120);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText('X₁ 🍃', 0, 0);
        this.ctx.restore();
    }
    
    drawDataPoints() {
        this.dataPoints.forEach((point, index) => {
            this.drawFlowerIcon(point.x, point.y, index);
        });
    }
    
    drawFlowerIcon(x, y, index) {
        const size = 20;
        const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#6c5ce7', '#a29bfe', '#fd6c6c'];
        
        this.ctx.fillStyle = colors[index % colors.length];
        this.ctx.beginPath();
        
        // Draw flower petals
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const petalX = x + Math.cos(angle) * (size / 3);
            const petalY = y + Math.sin(angle) * (size / 3);
            
            this.ctx.beginPath();
            this.ctx.arc(petalX, petalY, size / 4, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        
        // Draw flower center
        this.ctx.fillStyle = '#f7d794';
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 5, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add border
        this.ctx.strokeStyle = '#2d3436';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    drawCentroids(showMovement) {
        this.centroids.forEach((centroid, index) => {
            let x = centroid.x;
            let y = centroid.y;
            
            if (showMovement && this.currentStep >= 4) {
                x = centroid.finalX;
                y = centroid.finalY;
            }
            
            // Draw centroid
            this.ctx.fillStyle = this.colors.centroid;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 12, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw movement arrow if showing movement
            if (showMovement && this.currentStep === 4) {
                this.drawArrow(centroid.x, centroid.y, centroid.finalX, centroid.finalY);
            }
        });
    }
    
    drawArrow(fromX, fromY, toX, toY) {
        const headLength = 15;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        this.ctx.strokeStyle = this.colors.centroid;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();
        
        // Arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }
    
    drawClusterRegions(finalPosition) {
        const centroids = finalPosition ? 
            this.centroids.map(c => ({ x: c.finalX, y: c.finalY, color: c.color })) :
            this.centroids;
        
        centroids.forEach((centroid, index) => {
            this.ctx.fillStyle = centroid.color + '30'; // Add transparency
            this.ctx.strokeStyle = centroid.color;
            this.ctx.lineWidth = 2;
            
            // Create organic cluster shape
            this.ctx.beginPath();
            const radius = 80;
            const points = 8;
            for (let i = 0; i <= points; i++) {
                const angle = (i * 2 * Math.PI) / points;
                const variation = 0.7 + 0.3 * Math.sin(angle * 3); // Add some organic variation
                const x = centroid.x + Math.cos(angle) * radius * variation;
                const y = centroid.y + Math.sin(angle) * radius * variation;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        });
    }
    
    assignPointsToClusters(finalPosition) {
        const centroids = finalPosition ? 
            this.centroids.map(c => ({ x: c.finalX, y: c.finalY })) :
            this.centroids;
        
        this.dataPoints.forEach(point => {
            let minDistance = Infinity;
            let nearestCluster = 0;
            
            centroids.forEach((centroid, index) => {
                const distance = Math.sqrt((point.x - centroid.x) ** 2 + (point.y - centroid.y) ** 2);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestCluster = index;
                }
            });
            
            point.cluster = nearestCluster;
            
            // Draw connection line
            this.ctx.strokeStyle = this.centroids[nearestCluster].color + '80';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
            this.ctx.lineTo(centroids[nearestCluster].x, centroids[nearestCluster].y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        });
    }
    
    drawConvergenceIndicator() {
        // Draw checkmark or "converged" indicator
        this.ctx.fillStyle = '#00b894';
        this.ctx.font = 'bold 18px Segoe UI';
        this.ctx.fillText('✓ Converged!', this.canvas.width - 150, 40);
    }
}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const visualization = new KMeansVisualization();
});