---
layout: none
---
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Temperature → Ice Cream Sales Analysis</title>
  <style>
    /* WWL Brand Guidelines Implementation */
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #e8e6df; /* Primary Background: Neutral Gray */
      color: #091f2c; /* Text: Blueblack */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      padding: 20px;
      box-sizing: border-box;
    }

    .main-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      width: 100%;
      max-width: 900px;
    }

    .title {
      color: #091f2c;
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin: 0;
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(9, 31, 44, 0.1);
    }

    .container {
      background-color: #f4f3f5; /* Content Background: Off white */
      border-radius: 12px; /* Consistent rounded corners */
      box-shadow: 0 4px 16px rgba(9, 31, 44, 0.1); /* Professional shadow */
      padding: 40px 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 80px;
      transition: all 0.3s ease; /* Smooth transitions */
      animation: fadeInUp 0.6s ease-out;
      position: relative;
      width: 100%;
      min-height: 280px;
    }

    .icon-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;
      padding: 20px;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
      min-width: 200px;
      flex-shrink: 0;
    }

    .icon-block:hover {
      background-color: rgba(9, 31, 44, 0.02); /* Subtle hover background */
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(9, 31, 44, 0.08);
    }

    .icon-container {
      background: linear-gradient(135deg, #8dc8e8 0%, #0078d4 100%); /* Blue gradient */
      border-radius: 50%;
      padding: 20px;
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
      width: 72px;
      height: 72px;
      filter: brightness(0) invert(1); /* Make icons white */
      transition: transform 0.3s ease;
    }

    .icon-block:hover img {
      transform: scale(1.1);
    }

    .icon-label {
      font-size: 1.25rem;
      font-weight: 600;
      color: #091f2c; /* Blueblack text */
      margin-top: 8px;
      letter-spacing: 0.5px;
      white-space: nowrap; /* Prevent text wrapping */
    }

    .icon-subtitle {
      font-size: 0.9rem;
      font-weight: 400;
      color: rgba(9, 31, 44, 0.7);
      margin-top: 4px;
      white-space: nowrap; /* Prevent text wrapping */
    }

    .arrow {
      font-size: 4rem;
      color: #091f2c; /* Black text matching brand guidelines */
      transition: all 0.3s ease;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(9, 31, 44, 0.2);
      letter-spacing: 2px;
      flex-shrink: 0;
    }

    .arrow:hover {
      transform: translateX(8px) scale(1.15);
      color: #091f2c; /* Keep black on hover */
      text-shadow: 0 4px 8px rgba(9, 31, 44, 0.3);
    }

    /* Fade in animation following brand guidelines */
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

    /* Responsive design */
    @media (max-width: 768px) {
      .title {
        font-size: 2rem;
      }
      
      .container {
        flex-direction: column;
        gap: 32px;
        padding: 32px 24px;
        min-height: auto;
      }
      
      .icon-block {
        min-width: auto;
        width: 100%;
      }
      
      .arrow {
        transform: rotate(90deg);
        font-size: 3rem;
      }
      
      .arrow:hover {
        transform: rotate(90deg) translateX(8px) scale(1.15);
      }
    }

    @media (max-width: 480px) {
      .title {
        font-size: 1.5rem;
      }
      
      .container {
        gap: 24px;
        padding: 24px 16px;
      }
      
      .icon-label {
        font-size: 1.1rem;
      }
      
      .icon-subtitle {
        font-size: 0.8rem;
      }
    }

    /* Additional visual hierarchy elements */
    .container::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #8dc8e8, #cd9bcf, #ff5c39);
      border-radius: 14px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .container:hover::before {
      opacity: 0.1;
    }
  </style>
</head>
<body>
  <div class="main-wrapper">
    <div class="container">
      <div class="icon-block">
        <div class="icon-container">
          <img src="images/temperature.svg" alt="Temperature Icon" />
        </div>
        <div class="icon-label">Temperature</div>
        <div class="icon-subtitle">Environmental Data</div>
      </div>
      <div class="arrow">→</div>
      <div class="icon-block">
        <div class="icon-container">
          <img src="images/icecream.svg" alt="Ice Cream Icon" />
        </div>
        <div class="icon-label">Ice Cream Sales</div>
        <div class="icon-subtitle">Business Outcome</div>
      </div>
    </div>
  </div>
</body>
</html>
