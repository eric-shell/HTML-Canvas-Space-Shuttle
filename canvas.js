var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var circleArray = [];
var colorArray = [
	'#FFF4D9',
	'#D0E6D9',
	'#8FBDBF',
	'#57A6BB',
	'#4583AB',
]

var earthAtmosphere = c.createLinearGradient(0, 0, 0, innerHeight);
earthAtmosphere.addColorStop(0.000, 'rgba(10, 0, 178, 0)');
earthAtmosphere.addColorStop(0.050, 'rgba(10, 0, 178, .1)');
earthAtmosphere.addColorStop(0.150, 'rgba(255, 0, 0, .2)');
earthAtmosphere.addColorStop(0.225, 'rgba(255, 255, 225, 1)');
earthAtmosphere.addColorStop(0.250, 'rgba(153, 204, 255, 1)');
earthAtmosphere.addColorStop(1.000, 'rgba(153, 204, 255, 1)');

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx
	this.dy = dy;
	this.radius = radius
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

function init() {

	circleArray = [];

	for (var i = 0; i < 800; i++) {
		var radius = Math.random() * 1.15 + .5;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = (Math.random() * (innerHeight - radius * 2) + radius) - (innerHeight / 2);
		var dx = Math.random() * .15;
		var dy = Math.random() * .5;

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function render() {
	requestAnimationFrame(render);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

	c.fillStyle = earthAtmosphere;
	c.fillRect(0, 0, innerWidth, innerHeight);
}

init();
render();
