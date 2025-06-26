<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WWL Temperature vs Ice Cream Sales Analysis</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #e8e6df;
            padding: 40px;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }

        .dashboard-container {
            background: #f4f3f5;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 8px 32px rgba(9, 31, 44, 0.15);
            max-width: 1200px;
            width: 100%;
            margin-bottom: 20px;
        }

        .dashboard-title {
            color: #091f2c;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 32px;
            text-align: center;
        }

        .content-grid {
            display: grid;
            grid-template-columns: 400px 1fr;
            gap: 40px;
            align-items: start;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(9, 31, 44, 0.1);
        }

        .table-header {
            background: linear-gradient(135deg, #091f2c 0%, #2a446f 100%);
            color: #f4f3f5;
        }

        .header-cell {
            padding: 16px 12px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
        }

        .icon-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .icon {
            width: 24px;
            height: 24px;
            fill: #f4f3f5;
        }

        .data-row {
            transition: all 0.3s ease;
        }

        .data-row:hover {
            background-color: #e8e6df;
        }

        .data-row:nth-child(even) {
            background-color: #f9f9f9;
        }

        .data-cell {
            padding: 12px;
            text-align: center;
            font-size: 16px;
            color: #091f2c;
            font-weight: 600;
            border-bottom: 1px solid #e8e6df;
        }

        .temperature-cell {
            color: #ff5c39;
        }

        .sales-cell {
            color: #cd9bcf;
        }

        .chart-container {
            background: white;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 4px 16px rgba(9, 31, 44, 0.1);
            position: relative;
        }

        .chart-title {
            color: #091f2c;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
        }

        .chart-svg {
            width: 100%;
            height: 400px;
        }

        .axis-line {
            stroke: #091f2c;
            stroke-width: 2;
        }

        .axis-label {
            fill: #091f2c;
            font-size: 18px;
            font-weight: 600;
            font-family: 'Segoe UI', sans-serif;
        }

        .grid-line {
            stroke: #e8e6df;
            stroke-width: 1;
            stroke-dasharray: 3,3;
        }

        .data-point {
            fill: #cd9bcf;
            stroke: #091f2c;
            stroke-width: 2;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .data-point:hover {
            fill: #ff5c39;
            r: 8;
            stroke-width: 3;
        }

        .axis-tick {
            fill: #091f2c;
            font-size: 12px;
            font-family: 'Segoe UI', sans-serif;
        }

        .legend {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 16px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #091f2c;
            font-weight: 500;
        }

        .legend-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .temp-dot {
            background-color: #ff5c39;
        }

        .sales-dot {
            background-color: #cd9bcf;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .dashboard-container {
            animation: fadeInUp 0.6s ease-out;
        }

        @media (max-width: 768px) {
            .content-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <h2 class="dashboard-title">Temperature vs Ice Cream Sales Analysis</h2>
        
        <div class="content-grid">
            <div class="table-section">
                <table class="data-table">
                    <thead class="table-header">
                        <tr>
                            <th class="header-cell">
                                <div class="icon-container">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-2v1h2v1h-1v1h1v1h-2V5z"/>
                                    </svg>
                                    <span>Temp (°C)</span>
                                </div>
                            </th>
                            <th class="header-cell">
                                <div class="icon-container">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.9 1 3 1.9 3 3V19C3 20.1 3.9 21 5 21H11C12.1 21 13 20.1 13 19V13C13 11.9 13.9 11 15 11S17 11.9 17 13V19C17 20.1 17.9 21 19 21S21 20.1 21 19V13C21 11.9 20.1 11 19 11H17V9H21Z"/>
                                    </svg>
                                    <span>Sales</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="data-row">
                            <td class="data-cell temperature-cell">21°C</td>
                            <td class="data-cell sales-cell">93</td>
                        </tr>
                        <tr class="data-row">
                            <td class="data-cell temperature-cell">17°C</td>
                            <td class="data-cell sales-cell">87</td>
                        </tr>
                        <tr class="data-row">
                            <td class="data-cell temperature-cell">11°C</td>
                            <td class="data-cell sales-cell">56</td>
                        </tr>
                        <tr class="data-row">
                            <td class="data-cell temperature-cell">26°C</td>
                            <td class="data-cell sales-cell">102</td>
                        </tr>
                        <tr class="data-row">
                            <td class="data-cell temperature-cell">22°C</td>
                            <td class="data-cell sales-cell">103</td>
                        </tr>
                        <tr class="data-row">
                            <td class="data-cell temperature-cell">19°C</td>
                            <td class="data-cell sales-cell">101</td>
                        </tr>
                        <tr class="data-row">
                            <td class="data-cell temperature-cell">31°C</td>
                            <td class="data-cell sales-cell">127</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="chart-container">
                <h3 class="chart-title">Correlation Analysis</h3>
                <svg class="chart-svg" viewBox="0 0 500 400">
                    <!-- Grid lines -->
                    <defs>
                        <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 40" fill="none" class="grid-line"/>
                        </pattern>
                    </defs>
                    <rect width="400" height="320" x="80" y="40" fill="url(#grid)" opacity="0.3"/>
                    
                    <!-- Y-axis -->
                    <line x1="80" y1="40" x2="80" y2="360" class="axis-line"/>
                    <!-- X-axis -->
                    <line x1="80" y1="360" x2="480" y2="360" class="axis-line"/>
                    
                    <!-- Y-axis label -->
                    <text x="30" y="200" class="axis-label" text-anchor="middle" transform="rotate(-90, 30, 200)">Sales</text>
                    
                    <!-- X-axis label -->
                    <text x="280" y="390" class="axis-label" text-anchor="middle">Temperature (°C)</text>
                    
                    <!-- Y-axis ticks and labels -->
                    <text x="70" y="365" class="axis-tick" text-anchor="end">0</text>
                    <text x="70" y="295" class="axis-tick" text-anchor="end">50</text>
                    <text x="70" y="225" class="axis-tick" text-anchor="end">100</text>
                    <text x="70" y="155" class="axis-tick" text-anchor="end">150</text>
                    
                    <!-- X-axis ticks and labels -->
                    <text x="80" y="380" class="axis-tick" text-anchor="middle">0</text>
                    <text x="180" y="380" class="axis-tick" text-anchor="middle">10</text>
                    <text x="280" y="380" class="axis-tick" text-anchor="middle">20</text>
                    <text x="380" y="380" class="axis-tick" text-anchor="middle">30</text>
                    <text x="480" y="380" class="axis-tick" text-anchor="middle">40</text>
                    
                    <!-- Data points -->
                    <!-- 21°C, 93 sales -->
                    <circle cx="290" cy="211" r="6" class="data-point"/>
                    <!-- 17°C, 87 sales -->
                    <circle cx="250" cy="220" r="6" class="data-point"/>
                    <!-- 11°C, 56 sales -->
                    <circle cx="190" cy="284" r="6" class="data-point"/>
                    <!-- 26°C, 102 sales -->
                    <circle cx="340" cy="193" r="6" class="data-point"/>
                    <!-- 22°C, 103 sales -->
                    <circle cx="300" cy="191" r="6" class="data-point"/>
                    <!-- 19°C, 101 sales -->
                    <circle cx="270" cy="196" r="6" class="data-point"/>
                    <!-- 31°C, 127 sales -->
                    <circle cx="390" cy="145" r="6" class="data-point"/>
                </svg>
                
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-dot temp-dot"></div>
                        <span>Temperature</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-dot sales-dot"></div>
                        <span>Ice Cream Sales</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>