<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple Linear Graph</title>
  <style>
    body {
      font-family: 'Comic Sans MS', cursive, sans-serif;
      background-color: #ffffff;
      text-align: center;
      padding: 40px;
    }

    .title {
      font-weight: bold;
      font-size: 20px;
      border: 2px solid black;
      padding: 5px 10px;
      display: inline-block;
    }

    svg {
      border-left: 2px solid black;
      border-bottom: 2px solid black;
      margin-top: 30px;
      background-color: #fff;
    }

    .axis-label {
      font-size: 18px;
      font-weight: bold;
    }

    .dot {
      fill: #6a0dad;
      stroke: black;
      stroke-width: 1;
    }

    .line {
      stroke: #6a0dad;
      stroke-width: 2;
      fill: none;
    }
  </style>
</head>
<body>
  <div class="title">▶ WHITEBOARD</div>
  <h2>Simple Linear Graph</h2>

  <!-- SVG Linear Graph -->
  <svg width="500" height="400" viewBox="0 0 500 400">
    <!-- Axes -->
    <line x1="50" y1="350" x2="450" y2="350" stroke="black" stroke-width="2" />
    <line x1="50" y1="350" x2="50" y2="50" stroke="black" stroke-width="2" />
    
    <!-- Axis Arrows -->
    <polygon points="445,345 450,350 445,355" fill="black" />
    <polygon points="45,55 50,50 55,55" fill="black" />

    <!-- Axis Labels -->
    <text x="460" y="355" class="axis-label">x</text>
    <text x="35" y="45" class="axis-label">y</text>
    
    <!-- Axis Tick Marks -->
    <line x1="50" y1="350" x2="50" y2="355" stroke="black" stroke-width="1" />
    <line x1="150" y1="350" x2="150" y2="355" stroke="black" stroke-width="1" />
    <line x1="250" y1="350" x2="250" y2="355" stroke="black" stroke-width="1" />
    <line x1="350" y1="350" x2="350" y2="355" stroke="black" stroke-width="1" />
    <line x1="450" y1="350" x2="450" y2="355" stroke="black" stroke-width="1" />
    
    <line x1="45" y1="350" x2="50" y2="350" stroke="black" stroke-width="1" />
    <line x1="45" y1="250" x2="50" y2="250" stroke="black" stroke-width="1" />
    <line x1="45" y1="150" x2="50" y2="150" stroke="black" stroke-width="1" />
    <line x1="45" y1="50" x2="50" y2="50" stroke="black" stroke-width="1" />

    <!-- Data Line -->
    <polyline class="line" points="80,300 150,250 220,200 290,150 360,100" />

    <!-- Data Points -->
    <circle class="dot" cx="80" cy="300" r="5" />
    <circle class="dot" cx="150" cy="250" r="5" />
    <circle class="dot" cx="220" cy="200" r="5" />
    <circle class="dot" cx="290" cy="150" r="5" />
    <circle class="dot" cx="360" cy="100" r="5" />
  </svg>
</body>
</html>
