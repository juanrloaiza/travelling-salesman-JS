var cities = [];
var order = [];
var totalCities = 9;
var population = [];
var recordDistance = Infinity;
var recordPath = [];
var mutationRate = 1;
var run = false;
var slider;
var button;
var p;

function setup() {
  slider = createSlider(3, 30, totalCities);
  slider.parent('slider');
  slider.input(updateCities)

  p = createP('Num. of Cities: ' + (totalCities + 1))
  p.parent('slider')

  button = createButton('Start');
  button.parent('button');
  button.mousePressed(go);


}

function updateCities() {
  totalCities = slider.value();
  p.html('Num. of Cities: ' + (totalCities + 1));
}

function go() {
  updateCities();
  slider.hide()
  p.hide();
  button.hide();

  var canvas = createCanvas(600, 500);
  canvas.parent('main');

  for (let i = 0; i <= totalCities; i++) {
    newCity = createVector(random(20, width), random(100, height * 0.75));
    cities.push(newCity)
    order[i] = i;
  }

  for (let i = 0; i <= 100; i++) {
    population.push(shuffle(order))
  }



  run = true;
}


function draw() {
  background(255);
  translate(0, 30);

  if (run) {
    text('Number of cities: ' + (totalCities + 1), 0, 0);
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
      text(calculateDistance(bestOneP), 0, 40);
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
      text('Current record: ' + recordDistance, 0, 20);

    }

    nextGen(bestOneP, mutationRate);

    text('Gen: ' + frameCount, width - 80, 0)

    if (frameCount > 99999) {
      noLoop();
    }
  }
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
