<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temperature to Ice Cream Sales - Whiteboard Visualization</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .whiteboard {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 1000px;
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        .whiteboard::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20px 20px, #ddd 1px, transparent 1px),
                radial-gradient(circle at 60px 60px, #ddd 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.3;
            z-index: 0;
        }

        .content {
            position: relative;
            z-index: 1;
        }

        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 40px;
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .visualization-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 60px 0;
            position: relative;
        }

        .icon-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeInUp 1s ease-out;
        }

        .icon-container:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .icon-container img {
            width: 120px;
            height: 120px;
            object-fit: contain;
            margin-bottom: 20px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }

        .icon-label {
            font-size: 1.4rem;
            font-weight: bold;
            color: #34495e;
            text-align: center;
            margin-bottom: 10px;
        }

        .icon-description {
            font-size: 1rem;
            color: #7f8c8d;
            text-align: center;
            max-width: 200px;
            line-height: 1.4;
        }

        .arrow-container {
            position: relative;
            display: flex;
            align-items: center;
            margin: 0 30px;
        }

        .arrow {
            width: 120px;
            height: 4px;
            background: linear-gradient(90deg, #3498db, #2980b9);
            position: relative;
            border-radius: 2px;
            animation: pulseArrow 2s infinite;
        }

        .arrow::after {
            content: '';
            position: absolute;
            right: -8px;
            top: -8px;
            width: 0;
            height: 0;
            border-left: 20px solid #2980b9;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            animation: bounceArrow 2s infinite;
        }

        .correlation-text {
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: #e74c3c;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
            animation: fadeIn 1.5s ease-out 0.5s both;
        }

        .handwritten-note {
            position: absolute;
            background: #f39c12;
            color: white;
            padding: 15px 20px;
            border-radius: 15px;
            font-size: 1.1rem;
            font-weight: bold;
            transform: rotate(-5deg);
            box-shadow: 0 8px 20px rgba(243, 156, 18, 0.3);
            animation: fadeIn 2s ease-out 1s both;
        }

        .note-1 {
            top: -60px;
            left: -20px;
        }

        .note-2 {
            bottom: -60px;
            right: -20px;
            transform: rotate(3deg);
            background: #9b59b6;
            box-shadow: 0 8px 20px rgba(155, 89, 182, 0.3);
        }

        .insights-section {
            margin-top: 60px;
            padding: 30px;
            background: rgba(52, 152, 219, 0.1);
            border-radius: 15px;
            border-left: 5px solid #3498db;
            animation: slideInUp 1s ease-out 1.5s both;
        }

        .insights-title {
            font-size: 1.6rem;
            color: #2c3e50;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .insight-item {
            margin: 15px 0;
            padding: 15px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #e74c3c;
        }

        .insight-item strong {
            color: #e74c3c;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulseArrow {
            0%, 100% {
                opacity: 1;
                transform: scaleX(1);
            }
            50% {
                opacity: 0.7;
                transform: scaleX(1.1);
            }
        }

        @keyframes bounceArrow {
            0%, 100% {
                transform: translateX(0);
            }
            50% {
                transform: translateX(5px);
            }
        }

        @media (max-width: 768px) {
            .visualization-container {
                flex-direction: column;
                gap: 40px;
            }

            .arrow-container {
                margin: 0;
                transform: rotate(90deg);
            }

            .correlation-text {
                top: -30px;
                transform: translateX(-50%) rotate(-90deg);
            }

            .handwritten-note {
                position: relative;
                margin: 20px 0;
                transform: rotate(0deg);
            }

            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="whiteboard">
        <div class="content">
            <h1>Temperature → Ice Cream Sales Correlation</h1>
            
            <div class="visualization-container">
                <div class="handwritten-note note-1">Higher Temp!</div>
                
                <div class="icon-container">
                    <img src="quiz/images/temperature.svg" alt="Temperature Icon" onerror="this.src='quiz/images/temperature.png'">
                    <div class="icon-label">Temperature</div>
                    <div class="icon-description">Rising temperatures create demand for cooling products</div>
                </div>

                <div class="arrow-container">
                    <div class="arrow"></div>
                    <div class="correlation-text">Strong Positive Correlation</div>
                </div>

                <div class="icon-container">
                    <img src="quiz/images/icecream.svg" alt="Ice Cream Icon" onerror="this.src='quiz/images/icecreamshops.png'">
                    <div class="icon-label">Ice Cream Sales</div>
                    <div class="icon-description">Sales increase as people seek refreshing treats</div>
                </div>

                <div class="handwritten-note note-2">More Sales! 📈</div>
            </div>

            <div class="insights-section">
                <div class="insights-title">🔍 Key Insights</div>
                
                <div class="insight-item">
                    <strong>Seasonal Pattern:</strong> Ice cream sales typically peak during summer months when temperatures are highest, showing a clear positive correlation.
                </div>
                
                <div class="insight-item">
                    <strong>Business Impact:</strong> Understanding this relationship helps ice cream businesses plan inventory, staffing, and marketing campaigns based on weather forecasts.
                </div>
                
                <div class="insight-item">
                    <strong>Data Analytics:</strong> Temperature data can be used as a leading indicator to predict ice cream sales and optimize supply chain decisions.
                </div>
                
                <div class="insight-item">
                    <strong>Consumer Behavior:</strong> The correlation demonstrates how external environmental factors directly influence consumer purchasing decisions.
                </div>
            </div>
        </div>
    </div>

    <script>
        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            const iconContainers = document.querySelectorAll('.icon-container');
            
            iconContainers.forEach(container => {
                container.addEventListener('click', function() {
                    this.style.transform = 'scale(1.05) translateY(-10px)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                });
            });

            // Add a subtle parallax effect to handwritten notes
            const notes = document.querySelectorAll('.handwritten-note');
            let mouseX = 0, mouseY = 0;

            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;

                notes.forEach((note, index) => {
                    const speed = (index + 1) * 0.5;
                    const x = (mouseX - 0.5) * speed;
                    const y = (mouseY - 0.5) * speed;
                    note.style.transform += ` translate(${x}px, ${y}px)`;
                });
            });
        });
    </script>
</body>
</html>
