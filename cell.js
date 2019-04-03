class Cell {
  isAlive = false;
  x = 0;
  y = 0;
  neighbors = 0;

  //i and j is the Cell's grid index, x and y is it's location on the canvas
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

      //Debug stuff
      //----------------
      // textAlign(CENTER);
      // fill(0);
      // text(this.neighbors, this.x + this.w / 2, this.y + this.w / 2);
      //----------------

      //Returns so no overdraw
      return;
    }
    noFill();
    rect(this.x, this.y, this.w, this.w);
  }

  countAliveNeighbors() {
    let total = 0;

    /*
      Counts these cells from the cell's origin
          -1 0 1
        -1 * * *
         0 *   * 
         1 * * *

      It doesn't count if the index appears outside the array 
      i.e the index is more than -1 and less than the length of the array on both axes.
    */

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
