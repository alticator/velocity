// Alticator 2020

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