let grid;
let cols;
let rows;
let w = 30;
let updates = 20;
let pause = true;
let pauseButton;

function setup() {
  createCanvas(600, 600);
  frameRate(updates);

  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
  fpsSlider = createSlider(1, 100, 20, 2);
  pauseButton = createButton("Start");
  pauseButton.mousePressed(togglePause);

  // grid[0][0].isAlive = true;
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cell = grid[i][j];
      cell.show();

      cell.countAliveNeighbors();
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cell = grid[i][j];
      if (!pause) {
        simulate(i, j);
      }
    }
  }
}

function simulate(i, j) {
  cell = grid[i][j];
  neighbors = cell.neighbors;
  if (cell.isAlive && neighbors < 2) {
    cell.isAlive = false;
  }
  if (cell.isAlive && neighbors > 3) {
    cell.isAlive = false;
  }
  if (cell.isAlive && (neighbors === 2 || neighbors === 3)) {
    cell.isAlive = true;
  }
  if (!cell.isAlive && neighbors === 3) {
    cell.isAlive = true;
  }
}

function togglePause() {
  pause = !pause;
  pause ? (pauseButton.label = "Start") : (pauseButton.label = "Pause");
  console.log(pauseButton.label);
}

//Overriding p5's mousePressed function to check if a cell has been clicked on
function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].isMouseWithin(mouseX, mouseY)) {
        grid[i][j].isAlive = !grid[i][j].isAlive;
      }
    }
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}
