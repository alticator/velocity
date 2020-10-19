// Alticator 2020

// Add Coordinate Class
class Coordinate {
	constructor(x, y) {
		this.val = [x, y];
		this.x = x;
		this.y = y;
	}
}

// Add Polygon Shape
function polygon(point1, point2, point3, point4, fillColor) {
	this.point1 = point1;
	this.point2 = point2;
	this.point3 = point3;
	this.point4 = point4;
	this.color = fillColor;
	this.update = function() {
		this.point1Pixel = new Coordinate(this.point1.x * (canvas.width / 100), this.point1.y * (canvas.height / 100));
		this.point2Pixel = new Coordinate(this.point2.x * (canvas.width / 100), this.point2.y * (canvas.height / 100));
		this.point3Pixel = new Coordinate(this.point3.x * (canvas.width / 100), this.point3.y * (canvas.height / 100));
		this.point4Pixel = new Coordinate(this.point4.x * (canvas.width / 100), this.point4.y * (canvas.height / 100));
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.point1Pixel.x, this.point1Pixel.y);
		ctx.lineTo(this.point2Pixel.x, this.point2Pixel.y);
		ctx.lineTo(this.point3Pixel.x, this.point3Pixel.y);
		ctx.lineTo(this.point4Pixel.x, this.point4Pixel.y);
		ctx.fill();
	}
	this.moveByVelocity = function() {
		this.Xv += this.growXv;
		this.Yv += this.growYv;
		this.x += this.Xv;
		this.y += this.Yv;
	}
	objects.push(this);
}

function percent(type, number) {
	if (type == "width") {
		return number * (canvas.width / 100);
	}
	else if (type == "height") {
		return number * (canvas.height / 100);
	}
}

// Update Key Map
var keyMap = {
	up: false,
	down: false
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;

function keyDown(event) {
	if (event.key == "ArrowUp") {
		keyMap.up = true;
	}
	else if (event.key == "ArrowDown") {
		keyMap.down = true;
	}
}

function keyUp(event) {
	if (event.key == "ArrowUp") {
		keyMap.up = false;
	}
	else if (event.key == "ArrowDown") {
		keyMap.down = false;
	}
}

setAspectRatio(16, 9);

var vanishingPoint = new Coordinate(50, 50);
var vanishingPointMargin = 1;
//var leftPoint = new Coordinate(vanishingPoint.x - vanishingPointMargin, vanishingPoint.y);
//var rightPoint = new Coordinate(vanishingPoint.x + vanishingPointMargin, vanishingPoint.y);
var ground = new rect(0, vanishingPoint.y, 100, 100 - vanishingPoint.y, "#00d020");

var segment1 = new rect(0, 50, 100, 1, "#005010");
var segment2 = new rect(0, 80, 100, 1, "#005010");

var road = new polygon(vanishingPoint, vanishingPoint, new Coordinate(90, 100), new Coordinate(10, 100), "#808080");

new polygon(vanishingPoint, new Coordinate(10, 100), new Coordinate(11, 100), vanishingPoint, "white");
new polygon(vanishingPoint, new Coordinate(89, 100), new Coordinate(90, 100), vanishingPoint, "white");
new polygon(vanishingPoint, new Coordinate(49, 100), new Coordinate(50, 100), vanishingPoint, "yellow");
new polygon(vanishingPoint, new Coordinate(51, 100), new Coordinate(52, 100), vanishingPoint, "yellow");

var sky = new rect(0, 0, 100, vanishingPoint.y + 1, "dodgerblue");

var buildingBack = new rect(70, 20, 15, 50, "#0000A0");
var halfPointHigh = new Coordinate((vanishingPoint.x + buildingBack.x) / 2, (vanishingPoint.y + buildingBack.y) / 2);
var halfPointLow = new Coordinate((vanishingPoint.x + buildingBack.x) / 2, (vanishingPoint.y + (buildingBack.y + buildingBack.height)) / 2);
var buildingSide = new polygon(halfPointHigh, new Coordinate(buildingBack.x, buildingBack.y), new Coordinate(buildingBack.x, buildingBack.y + buildingBack.height), halfPointLow, "blue");

setInterval(renderFrame, 20);

function renderFrame() {
	if (segment1.y > 100) {
		segment1.height = 2;
		segment1.y = 50;
	}
	if (segment2.y > 100) {
		segment2.height = 2;
		segment2.y = 50;
	}
	if (keyMap.up) {
		console.log("GO");
		segment1.Yv = 0.5;
		segment2.Yv = 0.5;
		segment1.height += 0.05;
		segment2.height += 0.05;
	}
	else {
		segment1.Yv = 0;
		segment2.Yv = 0;
	}
	updateAll();
}