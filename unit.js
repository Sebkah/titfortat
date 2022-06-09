const STATE = {
  waiting: 'waiting',
  wanderering: 'wandering',
};

class Unit {
  constructor(position, id, GRID) {
    this.id = id;
    this.position = position;
    this.GRID = GRID;
    this.CELL;
    this.OLD_CELL;
    this.color;
    this.state = STATE.wandering;
  }

  initialize() {
    this.CELL = this.GRID.getCell(this.position);
    this.color = this.CELL.color;
    this.CELL.subscribe(this);
  }

  compute() {
    switch (this.state) {
      case STATE.waiting:
        break;
      case STATE.wandering:
        /* this.roam(); */
        this.roam(4);
        this.checkPositionBoundaries();

        break;

      default:
        break;
    }

    //GET CURRENT CELL
    this.OLD_CELL = this.CELL;
    this.CELL = this.GRID.getCell(this.position);

    if (this.OLD_CELL != this.CELL) {
      this.OLD_CELL.unsubscribe(this);
      this.CELL.subscribe(this);
    } /* else {
      this.CELL.subscribe(this);
    } */
  }

  draw() {
    stroke(this.color[0], this.color[1], this.color[2]);
    strokeWeight(20);
    point(this.position[0], this.position[1]);
  }

  roam(speed) {
    this.position[0] += (Math.random() - 0.5) * speed;
    this.position[1] += (Math.random() - 0.5) * speed;
  }

  collisionCheck() {
    this.CELL.UNITS.forEach((other_unit) => {});
  }

  followFlow() {
    this.position[0] += (noise(this.position[0] * 0.05) - 0.5) * 10;
    this.position[1] += (noise(this.position[1] * 0.05) - 0.5) * 10;
  }

  checkPositionBoundaries() {
    if (this.position[0] >= width) this.position[0] = width - 1;
    if (this.position[1] >= width) this.position[1] = width - 1;
    if (this.position[0] <= 0) this.position[0] = 1;
    if (this.position[1] <= 0) this.position[1] = 1;
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
      let unit = new Unit([random(0, 800), random(0, 800)], i, this.GRID);
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
