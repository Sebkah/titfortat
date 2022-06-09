const step = 100;
let GRID;
let UNITMANAGER;
let unit;

let config = {
  immunity: true,
  numberOfUnits: 1000,
  drawGrid: false,
  seeBeyondCell: false,
};

function setup() {
  createCanvas(800, 800);
  GRID = new Grid(step);
  GRID.initialize();

  UNITMANAGER = new UnitManager(1000, GRID);
  UNITMANAGER.initialize();

  /*   unit = new Unit([400, 120], GRID);
  unit2 = new Unit([210, 654], GRID); */

  rect();

  noFill();

  colorMode(HSB);
  /*   frameRate(30); */
}

function draw() {
  background(0);
  /*   GRID.draw(); */
  UNITMANAGER.compute();
  UNITMANAGER.draw();
  /*   drawingContext.filter = 'blur(10px)'; */
}
