const step = 100;
let GRID;
let UNITMANAGER;
let unit;

function setup() {
  createCanvas(800, 800);
  GRID = new Grid(step);
  GRID.initialize();

  UNITMANAGER = new UnitManager(200, GRID);
  UNITMANAGER.initialize();

  /*   unit = new Unit([400, 120], GRID);
  unit2 = new Unit([210, 654], GRID); */

  rect();

  noFill();
  colorMode(HSB);
}

function draw() {
  background(0);
  GRID.draw();
  UNITMANAGER.compute();
  UNITMANAGER.draw();
}
