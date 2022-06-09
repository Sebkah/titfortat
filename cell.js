class Cell {
  constructor(corner, height) {
    this.corner = corner;
    this.height = height;
    this.UNITS = new Array();
    this.color = [random(150, 255), random(0, 180), random(0, 255)];
    this.marking = false;
  }

  draw() {
    /*    colorMode(HSB); */
    stroke(this.color[0], this.color[1], this.color[2]);
    rect(this.corner[0] + 1, this.corner[1] + 1, this.height - 2);
  }

  subscribe(unit) {
    if (this.marking) this.markUnit(unit);
    if (!this.UNITS.includes(unit)) this.UNITS.push(unit);
  }
  unsubscribe(unit) {
    if (this.marking) this.unmarkUnit(unit);
    this.UNITS = this.UNITS.filter((current_unit) => {
      return current_unit != unit;
    });
  }

  markUnit(unit) {
    unit.color = [255, 0, 255];
  }
  unmarkUnit(unit) {
    unit.color = this.color;
  }
}

class Grid {
  constructor(step) {
    this.step = step;
    this.res = width / step;
    this.GRID = new Array();
  }

  initialize() {
    for (let i = 0; i < this.res; i++) {
      let ROW = new Array();
      for (let j = 0; j < this.res; j++) {
        ROW.push(new Cell([i * this.step, j * this.step], this.step));
      }

      this.GRID.push(ROW);
    }
    this.GRID[1][1].marking = true;
    console.log(this.GRID);
  }

  draw() {
    console.log(this.GRID[1][1].UNITS.length);

    strokeWeight(1);
    this.GRID.forEach((row) => {
      row.forEach((cell) => {
        cell.draw();
      });
    });
  }

  getCell(position) {
    let cellX = Math.floor(position[0] / this.step);
    let cellY = Math.floor(position[1] / this.step);
    return this.GRID[cellX][cellY];
    /* console.log([cellX, cellY]); */
  }
}
