<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Temperature → Ice Cream Sales</title>
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
      padding: 32px 48px;
      display: flex;
      align-items: center;
      gap: 40px;
      transition: all 0.3s ease;
    }

    .icon-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      text-align: center;
    }

    .icon-block img {
      width: 64px;
      height: 64px;
      transition: transform 0.3s ease;
    }

    .icon-block:hover img {
      transform: scale(1.1);
    }

    .icon-label {
      font-size: 1rem;
      font-weight: 600;
    }

    .arrow {
      font-size: 2rem;
      color: #ff5c39;
      transition: transform 0.3s ease;
    }

    .arrow:hover {
      transform: translateX(5px);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-block">
      <img src="images/temperature.png" alt="Temperature Icon" />
      <div class="icon-label">Temperature</div>
    </div>
    <div class="arrow">→</div>
    <div class="icon-block">
      <img src="images/icecreamshops.png" alt="Ice Cream Icon" />
      <div class="icon-label">Ice Cream Sales</div>
    </div>
  </div>
</body>
</html>
