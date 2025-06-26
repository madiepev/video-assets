<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Animated Dotted Line</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #e8e6df;
      color: #091f2c;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background-color: #f4f3f5;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(9, 31, 44, 0.1);
      padding: 32px;
      display: flex;
      align-items: center;
      gap: 32px;
    }

    .icon-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      background-color: #f4f3f5; /* Content Background: Off white */
      border-radius: 12px; /* Consistent rounded corners */
      box-shadow: 0 4px 16px rgba(9, 31, 44, 0.1); /* Professional shadow */
      padding: 24px 32px;
      transition: all 0.3s ease;
      min-width: 160px;
    }

    .icon-block:hover {
      background-color: rgba(9, 31, 44, 0.02); /* Subtle hover background */
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(9, 31, 44, 0.08);
    }

    .icon-container {
      background: linear-gradient(135deg, #8dc8e8 0%, #0078d4 100%); /* Blue gradient for temperature */
      border-radius: 50%;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(9, 31, 44, 0.15);
    }

    .icon-block:nth-child(3) .icon-container {
      background: linear-gradient(135deg, #cd9bcf 0%, #c73ecc 100%); /* Magenta gradient for ice cream */
    }

    .icon-block:hover .icon-container {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(9, 31, 44, 0.2);
    }

    .icon-block img {
      width: 48px;
      height: 48px;
      filter: brightness(0) invert(1); /* Make icons white */
      transition: transform 0.3s ease;
    }

    .icon-block:hover img {
      transform: scale(1.1);
    }

    .icon-label {
      font-weight: 600;
      color: #091f2c; /* Blueblack text */
      font-size: 1.1rem;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }

    .icon-subtitle {
      font-size: 0.85rem;
      font-weight: 400;
      color: rgba(9, 31, 44, 0.7);
      margin-top: 2px;
    }

    .dotted-line {
      position: relative;
      width: 100px;
      height: 2px;
      background: repeating-linear-gradient(
        to right,
        #ff5c39 0,
        #ff5c39 10px,
        transparent 10px,
        transparent 20px
      );
      animation: slide 1s linear infinite;
      flex-shrink: 0;
    }

    @keyframes slide {
      from { background-position: 0 0; }
      to { background-position: 20px 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-block">
      <div class="icon-container">
        <img src="images/temperature.svg" alt="Temperature" />
      </div>
      <div class="icon-label">Temperature</div>
      <div class="icon-subtitle">Environmental Data</div>
    </div>
    <div class="dotted-line"></div>
    <div class="icon-block">
      <div class="icon-container">
        <img src="images/icecream.svg" alt="Ice Cream" />
      </div>
      <div class="icon-label">Ice Cream Sales</div>
      <div class="icon-subtitle">Business Outcome</div>
    </div>
  </div>
</body>
</html>
