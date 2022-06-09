class Cell {
  constructor(corner, height) {
    this.corner = corner;
    this.height = height;
    this.UNITS = new Array();
    this.color = [random(150, 255), random(0, 180), random(0, 255)];
  }

  draw() {
    /*    colorMode(HSB); */
    stroke(this.color[0], this.color[1], this.color[2]);
    rect(this.corner[0] + 1, this.corner[1] + 1, this.height - 2);
  }

  subscribe() {
    /*  this.color = [0, 255, 0]; */
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
    console.log(this.GRID);
  }

  draw() {
    stroke(255);
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

class Unit {
  constructor(position, GRID) {
    this.position = position;
    this.GRID = GRID;
    this.CELL;
    this.color;
  }

  initialize() {
    this.CELL = this.GRID.getCell(this.position);
    this.color = this.CELL.color;
  }

  compute() {
    /* this.roam(); */
    this.followFlow();
    if (this.position[0] >= width) this.position[0] = width - 1;
    if (this.position[1] >= width) this.position[1] = width - 1;
    if (this.position[0] <= 0) this.position[0] = 1;
    if (this.position[1] <= 0) this.position[1] = 1;

    this.CELL = this.GRID.getCell(this.position);
    this.CELL.subscribe();
    /*     console.log(this.CELL); */
  }

  draw() {
    let color = this.color;
    stroke(color[0], color[1], color[2]);
    strokeWeight(20);
    point(this.position[0], this.position[1]);
  }

  roam() {
    this.position[0] += (Math.random() - 0.5) * 10;
    this.position[1] += (Math.random() - 0.5) * 10;
  }

  followFlow() {
    this.position[0] +=
      (noise(this.position[0] * 5, this.position[1] * 5) - 0.5) * 10;
    this.position[1] +=
      (noise(this.position[0] + 4, this.position[1] + 4) - 0.5) * 10;
  }
}

class UnitManager {
  constructor(numberOfUnits, GRID) {
    this.numberOfUnits = numberOfUnits;
    this.UNITS = new Array();
    this.GRID = GRID;
  }

  initialize() {
    for (let i = 0; i < this.numberOfUnits; i++) {
      let unit = new Unit([random(0, 800), random(0, 800)], this.GRID);
      unit.initialize();
      this.UNITS.push(unit);
    }
  }

  compute() {
    this.UNITS.forEach((unit) => {
      unit.compute();
    });
  }

  draw() {
    this.UNITS.forEach((unit) => {
      unit.draw();
    });
  }
}
