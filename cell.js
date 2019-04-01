class Cell {
  isAlive = false;
  x = 0;
  y = 0;
  neighbors = 0;

  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = i * w;
    this.y = j * w;
  }

  //Draws a white rectangle if it's alive and a black one if it isn't
  show() {
    stroke(255);
    if (this.isAlive) {
      fill(255);
      rect(this.x, this.y, this.w, this.w);
      textAlign(CENTER);
      fill(0);
      text(this.neighbors, this.x + this.w / 2, this.y + this.w / 2);
      //Returns so no overdraw
      return;
    }
    noFill();
    rect(this.x, this.y, this.w, this.w);
  }

  countAliveNeighbors() {
    let total = 0;

    for (let xOff = -1; xOff <= 1; xOff++) {
      for (let yOff = -1; yOff <= 1; yOff++) {
        let x = this.i + xOff;
        let y = this.j + yOff;
        if (x > -1 && x < cols && y > -1 && y < rows) {
          let neighbor = grid[x][y];
          if (!(xOff === 0 && yOff === 0)) {
            if (neighbor.isAlive) {
              total++;
            }
          }
        }
      }
    }

    this.neighbors = total;
  }

  /*
      ------- < this.y   
      |     |
      |     |
      ------- < this.y + w
      ^     ^
      this.x this.x + w
  */

  isMouseWithin(x, y) {
    return x > this.x && x < this.x + w && y > this.y && y < this.y + w;
  }
}
