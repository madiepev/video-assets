<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Whiteboard Decision Tree</title>
  <style>
    body {
      background-color: #ffffff;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      display: flex;
      justify-content: center;
      padding-top: 60px;
    }

    .tree {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .node {
      border: 2px solid black;
      padding: 6px 12px;
      margin: 10px;
      font-size: 16px;
      background-color: #fff;
    }

    .branch {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-top: -10px;
    }

    .line-down {
      width: 2px;
      height: 20px;
      background-color: black;
      margin: 0 auto;
    }

    .line-horizontal {
      height: 2px;
      background-color: black;
      position: relative;
    }

    .subtree {
      display: flex;
      justify-content: space-between;
      width: 300px;
    }

    .connector {
      height: 20px;
      width: 2px;
      background: black;
      margin: 0 auto;
    }

    .sub-branch {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="tree">
    <div class="node">MAIN APPLICATION</div>
    <div class="line-down"></div>
    <div class="node">integrations</div>
    <div class="line-down"></div>

    <div class="subtree">
      <div class="sub-branch">
        <div class="node">GraphQL</div>
        <div class="connector"></div>
        <div class="subtree">
          <div class="node">CORE</div>
          <div class="node">PLATFORM</div>
        </div>
      </div>
      <div class="sub-branch">
        <div class="node">JSON API</div>
      </div>
    </div>
  </div>
</body>
</html>
