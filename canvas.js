// Canvas setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// Set canvas element to viewport size on load
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas element to viewport size when altered
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Re-init to prevent an empty void display in the new areas
  init();
});

// Star setup
var starArray = [];
var starColorArray = [
  '#FFF4D9',
  '#D0E6D9',
  '#8FBDBF',
  '#57A6BB',
  '#4583AB',
];

// Space ship / space shuttle setup
var shipArray = [];
var ship = new Image();
ship.src = 'ship.png';

// Star object
function Star(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = starColorArray[Math.floor(Math.random() * starColorArray.length)];

  this.draw = function () {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowBlur = this.radius * 5;
    c.shadowColor = this.color;
    c.fill();
    c.restore();
  };

  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;

    // Star variable acceleration
    if (this.y > ((innerHeight / 2) - 92)) {
      this.y += (this.dy * 5);
    }
    if (this.y > ((innerHeight / 4) - 92)) {
      this.y += (this.dy * 15);
    }
    this.draw();
  }
}

// Ship object
function Ship(x, y, dy, height) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.height = height;

  this.draw = function () {
    c.save();
    c.drawImage(ship, this.x, this.y);
    c.restore();
  };

  this.update = function () {

    // Ship variable acceleration
    if (this.y > ((innerHeight / 2) - (this.height / 2))) {
      // Ship increased acceleration for launch
      if (this.y > (innerHeight - (innerHeight / 2) + (this.height / 2))) {
        this.y -= (this.dy * 2);
      }
      // Ship standard acceleration for leaving atmosphere
      else {
        this.y -= this.dy;
      }
      this.draw();
    }
    // Ship resting upon space entry
    else {
      this.draw();
    }
  }
}

// Set the initial values for all objects
function init() {

  // Configure stars
  starArray = [];
  for (var i = 0; i < 400; i++) {
    var starRadius = (Math.random() + .5) * 1.25;
    var starX = Math.random() * (innerWidth - starRadius * 2) + starRadius;
    var starY = (Math.random() * (innerHeight - starRadius * 2) + starRadius) - (innerHeight / 2);
    var starDx = (Math.random() - 0.5) * .15;
    var starDy = Math.random() * .5;

    starArray.push(new Star(starX, starY, starDx, starDy, starRadius));
  }

  // Configure ship
  shipArray = [];
  var shipWidth = 115;
  var shipHeight = 184;
  var shipStart = 25;
  var shipX = (innerWidth / 2) - (shipWidth / 2);
  var shipY = (innerHeight - shipHeight) - shipStart;
  var shipDy = .5;

  shipArray.push(new Ship(shipX, shipY, shipDy, shipHeight));
}

// Begin the canvas sequence
function draw() {
  requestAnimationFrame(draw);

  // Clear canvas to prevent objects from the previous frames from being displayed
  c.clearRect(0, 0, innerWidth, innerHeight);

  // Draw stars
  for (var i = 0; i < starArray.length; i++) {
    starArray[i].update();
  }

  // Draw ship
  for (var i = 0; i < shipArray.length; i++) {
    shipArray[i].update();
  }
}

// Start
init();
draw();
