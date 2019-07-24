var cities = [];
var order = [];
var totalCities = 30;
var population = [];
var recordDistance = Infinity;
var recordPath = [];
var mutationRate = 1;

function setup() {
  var canvas = createCanvas(600, 800);
  canvas.parent('main');

  for (let i = 0; i <= totalCities; i++) {
    newCity = createVector(random(20, width), random(100, height / 2));
    cities.push(newCity)
    order[i] = i;
  }

  for (let i = 0; i <= 100; i++) {
    population.push(shuffle(order))
  }
}

function draw() {
  background(255);
  translate(0, 20);

  for (let i = 0; i < cities.length; i++) {
    circle(cities[i].x, cities[i].y, 10);
  }

  var bestOneP = bestOrder(population);

  for (let i = 0; i < bestOneP.length - 1; i++) {
    push();
    stroke(200);
    start = cities[bestOneP[i]];
    end = cities[bestOneP[i + 1]];
    line(start.x, start.y, end.x, end.y)
    pop();
    text(calculateDistance(bestOneP), 32, 32);
  }

  if (calculateDistance(bestOneP) < recordDistance) {
    recordDistance = calculateDistance(bestOneP);
    recordPath = bestOneP.slice();
  }

  for (let i = 0; i < recordPath.length - 1; i++) {
    start = cities[recordPath[i]];
    end = cities[recordPath[i + 1]];
    // translate(0, height / 2);
    line(start.x, start.y, end.x, end.y);
    text('Current record: ' + recordDistance, 32, 10);

  }

  nextGen(bestOneP, mutationRate);

  if (frameCount > 99999) {
    noLoop();
  }

  text('Gen: ' + frameCount, width - 80, 32)

}

function bestOrder(population) {
  var record = Infinity;
  var bestOrderP;
  for (let i = 0; i < population.length; i++) {
    d = calculateDistance(population[i]);
    if (d < record) {
      bestOrderP = population[i];
      record = d;
    }
  }
  return bestOrderP;
}

function calculateDistance(array) {
  totalDistance = 0;
  for (let i = 0; i < array.length - 1; i++) {
    start = cities[array[i]];
    end = cities[array[i + 1]];
    distance = p5.Vector.dist(start, end);
    totalDistance += distance;
  }
  return totalDistance;
}


function randSwap(array) {
  i1 = floor(random(array.length));
  i2 = floor(random(array.length));

  temp = array[i1];
  array[i1] = array[i2];
  array[i2] = temp;

  return array
}

function nextGen(bestOneP, mutationRate) {
  population = [];
  for (let i = 0; i <= 100; i++) {
    if (random() < mutationRate) {
      newOrder = randSwap(bestOneP);
      population.push(newOrder);
    }
  }

  if (population.length == 0) {
    noLoop();
  }
}
