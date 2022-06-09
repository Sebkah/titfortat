const STATE = {
  waiting: 'waiting',
  wanderering: 'wandering',
};

class Unit {
  constructor(position, id, sick = false, GRID) {
    this.id = id;
    this.position = position;
    this.GRID = GRID;
    this.CELL;
    this.OLD_CELL;
    this.color;
    this.sick = sick;
    this.time_sick = 0;
    this.immune = false;
    this.time_immune = 0;
    this.state = STATE.wandering;
  }

  initialize() {
    this.CELL = this.GRID.getCell(this.position);
    /*   this.color = this.CELL.color; */
    this.color = this.sick ? [125, 125, 125] : [0, 0, 255];
    this.CELL.subscribe(this);
  }

  compute() {
    switch (this.state) {
      case STATE.waiting:
        break;
      case STATE.wandering:
        /* this.roam(); */
        this.roam(5);

        this.checkPositionBoundaries();
        this.collisionCheck();

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
    }

    this.updateSickStatus();
  }

  updateSickStatus() {
    if (this.sick) this.time_sick += 1;

    if (this.time_sick > 60) {
      this.sick = false;
      this.immune = true;
      this.time_sick = 0;
    }

    if (this.immune) {
      this.sick = false;
      this.time_immune += 1;
    }

    if (this.time_immune > 40) {
      this.immune = false;
      this.time_immune = 0;
    }
  }

  draw() {
    this.color = this.sick
      ? [125, 125, 125]
      : [
          0 + this.immune * 200,
          int(this.immune) * 125,
          255 - this.immune * 125,
        ];
    stroke(this.color[0], this.color[1], this.color[2]);
    /*     stroke(this.color[0], this.color[1], this.color[2]);
strokeWeight(20);
point(this.position.x, this.position.y); */

    /*   stroke(0, 0, 255); */
    strokeWeight(2);
    /*  ellipse(this.position.x, this.position.y, 10); */
    strokeWeight(20);
    point(this.position.x, this.position.y);
  }

  roam(speed) {
    this.position.x += (Math.random() - 0.5) * speed;
    this.position.y += (Math.random() - 0.5) * speed;
  }

  collisionCheck() {
    this.CELL.UNITS.forEach((other_unit) => {
      if (other_unit == this) return;
      let distance = Infinity;
      distance = other_unit.position.dist(this.position);
      if (distance < 20) {
        /*stop(other_unit); */
        if (this.sick) this.contaminate(other_unit);
      }
    });
  }

  followFlow() {
    this.position.x += (noise(this.position.x * 0.05) - 0.5) * 10;
    this.position.y += (noise(this.position.y * 0.05) - 0.5) * 10;
  }

  checkPositionBoundaries() {
    if (this.position.x >= width) this.position.x = width - 1;
    if (this.position.y >= width) this.position.y = width - 1;
    if (this.position.x <= 0) this.position.x = 1;
    if (this.position.y <= 0) this.position.y = 1;
  }

  stop(other_unit) {
    this.state = STATE.waiting;
    other_unit.state = STATE.waiting;
  }

  contaminate(other_unit) {
    if (random() > 0.5 && other_unit.immune == false) other_unit.sick = true;
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
      let unit = new Unit(
        new p5.Vector(random(0, 800), random(0, 800)),
        i,
        random() < 0.5,
        this.GRID
      );
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
