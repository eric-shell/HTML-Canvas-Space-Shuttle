var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

var c = canvas.getContext('2d');
var starArray = [];
var colorArray = [
	'#FFF4D9',
	'#D0E6D9',
	'#8FBDBF',
	'#57A6BB',
	'#4583AB',
]

var ship = new Image();
ship.src = "ship.png";

function Star(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

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

	starArray = [];
	for (var i = 0; i < 800; i++) {
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
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < starArray.length; i++) {
		starArray[i].update();
	}

  c.drawImage(ship, ((innerWidth / 2) - 57), ((innerHeight - 184) - 50));
}

init();
draw();
