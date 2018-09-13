// Canvas setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var w = window.innerWidth;
var h = window.innerHeight;

// Set canvas element to viewport size on load
canvas.width = w;
canvas.height = h;

// Update canvas element to viewport size when resized
window.onresize = function(){
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
};

// User controls
var keys = [];

document.addEventListener('keydown', function (e) {
  keys[e.which] = true;
});

document.addEventListener('keyup', function (e) {
  keys[e.which] = false;
});

// Star setup
var starArray = [];
var starColorArray = [
  '#ffd4bd',
  '#FFF4D9',
  '#D0E6D9',
  '#8FBDBF',
  '#57A6BB',
];

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

  // Star animation
  this.update = function () {
    this.x += this.dx;
    this.y += this.dy * 12.5;
    this.draw();
  }
}

// Space ship / space shuttle setup
var shipImage = new Image();
shipImage.src = 'ship.png';
var shipWidth = 115;
var shipHeight = 184;

var ship = {
  x: w / 2, y: h,
  vx: 0, vy: -4,
  ax: 0, ay: 0,
  r: -90 * Math.PI / 180,

  draw: function () {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.r);
    c.rotate(90 * Math.PI / 180);
    c.drawImage(shipImage, -(shipWidth / 2), -(shipHeight / 2));
    c.restore();
  }
};

function updateShipPosition(obj) {

  // Ship rotation
  if (keys[37]) ship.r -= 0.05;
  if (keys[39]) ship.r += 0.05;

  // Ship thrust
  if (keys[38]) {
    ship.ax = Math.cos(ship.r) * 0.05;
    ship.ay = Math.sin(ship.r) * 0.05;
  } else {
    ship.ax = ship.ay = 0;
  }

  // Update velocity
  obj.vx += obj.ax;
  obj.vy += obj.ay;

  applyFriction(obj);

  // Update position
  obj.x += obj.vx;
  obj.y += obj.vy;

  // When the ship exits the viewport send it to the parallel side
  if (obj.x < 0) {
    obj.x = w;
  }
  if (obj.x > w) {
    obj.x = 0;
  }
  if (obj.y < 0) {
    obj.y = h;
  }
  if (obj.y > h) {
    obj.y = 0;
  }

  ship.draw();
}

var friction = 0.02;

function applyFriction(obj) {

  var speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);
  var angle = Math.atan2(obj.vy, obj.vx);

  if (speed > friction) {
    speed -= friction;
  } else {
    speed = 0;
  }

  // Apply friction
  obj.vx = Math.cos(angle) * speed;
  obj.vy = Math.sin(angle) * speed;
}

// Set the initial values for all objects
function init() {

  // Configure stars
  starArray = [];
  for (var i = 0; i < 800; i++) {
    var starRadius = (Math.random() + .5) * 1.25;
    var starX = Math.random() * (w * 2);
    var starY = Math.random() * -(h * 3) - (h / 2);
    var starDx = (Math.random() - 0.5) * .15;
    var starDy = Math.random() * .5;

    starArray.push(new Star(starX, starY, starDx, starDy, starRadius));
  }
}

// Begin the canvas sequence
function draw() {
  requestAnimationFrame(draw);

  // Clear canvas to prevent objects from the previous frames from being displayed
  c.clearRect(0, 0, w, h);

  // Draw and update stars
  for (var i = 0; i < starArray.length; i++) {
    starArray[i].update();
  }

  // Draw and update ship
  updateShipPosition(ship);
}

// Start
init();
draw();