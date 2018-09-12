// Canvas setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// Set canvas element to viewport size on load
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas element to viewport size when altered
window.addEventListener('resize', function() {
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
]

// Space ship / space shuttle setup
var ship = new Image();
ship.src = "ship.png";

// Star Object
function Star(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = starColorArray[Math.floor(Math.random() * starColorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
    c.shadowBlur = this.radius * 4;
    c.shadowColor = this.color;
		c.fill();
	};

	this.update = function() {

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

function init() {

	// Configure stars
	starArray = [];
	for (var i = 0; i < 1500; i++) {
		var radius = (Math.random() + .5) * 1.25;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = (Math.random() * (innerHeight - radius * 2) + radius) - (innerHeight / 2);
		var dx = (Math.random() - 0.5) * .15;
		var dy = Math.random() * .5;

		starArray.push(new Star(x, y, dx, dy, radius));
	}
}

function draw() {
	requestAnimationFrame(draw);

	// Clear canvas to prevent objects on the previous frames from being displayed
	c.clearRect(0, 0, innerWidth, innerHeight);

	// Draw stars
	for (var i = 0; i < starArray.length; i++) {
		starArray[i].update();
	}

	// Draw ship
  c.drawImage(ship, ((innerWidth / 2) - 57), ((innerHeight - 184) - 50));
}

// Render canvas
init();
draw();
