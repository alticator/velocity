// Alticator 2020

// Update Key Map
var keyMap = {
	up: false,
	down: false,
	left: false,
	right: false
};

document.onkeydown = keyDown;
document.onkeyup = keyUp;

function keyDown(event) {
	if (event.key == "ArrowUp") {
		keyMap.up = true;
	}
	else if (event.key == "ArrowDown") {
		keyMap.down = true;
	}
	else if (event.key == "ArrowLeft") {
		keyMap.left = true;
	}
	else if (event.key == "ArrowRight") {
		keyMap.right = true;
	}
}

function keyUp(event) {
	if (event.key == "ArrowUp") {
		keyMap.up = false;
	}
	else if (event.key == "ArrowDown") {
		keyMap.down = false;
	}
	else if (event.key == "ArrowLeft") {
		keyMap.left = false;
	}
	else if (event.key == "ArrowRight") {
		keyMap.right = false;
	}
	else if (event.key == "s") {
		if (document.getElementById("stats").style.display == "none") {
			document.getElementById("stats").style.display = "initial";
		}
		else {
			document.getElementById("stats").style.display = "none";
		}
	}
}

// Canvas Settings
setAspectRatio(16, 9);
var fps = 60;
var updateInterval = 1000 / fps;

// Game Settings
var speed = 1;
var turnSpeed = 1.1;
var gravity = 0.02;
var distanceLeft = 1000;
var obstacleExtraSpeed = 0.5;

// Game World
var vanishingPoint = new Coordinate(50, 50);
var vanishingPointMargin = 1;
var ground = new rect(0, vanishingPoint.y, 100, 100 - vanishingPoint.y, "#00d020");

var segment1 = new polygon(vanishingPoint, new Coordinate(140, 100), new Coordinate(140.5, 100), vanishingPoint, "white");
var segment2 = new polygon(vanishingPoint, new Coordinate(-40, 100), new Coordinate(-40.5, 100), vanishingPoint, "white");
var segmentX0 = new polygon(new Coordinate(0, 50 + 2.5 / 2), new Coordinate(100, 50 + 2.5 / 2), new Coordinate(100, 50.1 + 2.5 / 2), new Coordinate(0, 50.1 + 2.5 / 2), "white");
var segmentX1 = new polygon(new Coordinate(0, 52.5), new Coordinate(100, 52.5), new Coordinate(100, 52.6), new Coordinate(0, 52.6), "white");
var segmentX2 = new polygon(new Coordinate(0, 55), new Coordinate(100, 55), new Coordinate(100, 55.1), new Coordinate(0, 55.1), "white");
var segmentX3 = new polygon(new Coordinate(0, 60), new Coordinate(100, 60), new Coordinate(100, 60.1), new Coordinate(0, 60.1), "white");
var segmentX4 = new polygon(new Coordinate(0, 70), new Coordinate(100, 70), new Coordinate(100, 70.1), new Coordinate(0, 70.1), "white");

var segmentX0Y = 50 + 2.5 / 2;
var segmentX1Y = 52.5;
var segmentX2Y = 55;
var segmentX3Y = 60;
var segmentX4Y = 70;

var road = new polygon(vanishingPoint, vanishingPoint, new Coordinate(120, 100), new Coordinate(-20, 100), "#808080");

var leftW = new polygon(vanishingPoint, new Coordinate(-9, 100), new Coordinate(-8, 100), vanishingPoint, "white");
var rightW = new polygon(vanishingPoint, new Coordinate(108, 100), new Coordinate(109, 100), vanishingPoint, "white");
var leftY = new polygon(vanishingPoint, new Coordinate(49, 100), new Coordinate(50, 100), vanishingPoint, "yellow");
var rightY = new polygon(vanishingPoint, new Coordinate(51, 100), new Coordinate(52, 100), vanishingPoint, "yellow");

var sky = new rect(0, 0, 100, vanishingPoint.y + 1, "dodgerblue");

var speedUp = new rect(10, -10, 3, 3, "blue");
speedUp.growYv = gravity;

var obstacle = new rect(45, -10, 10, 10, "red");
obstacle.growYv = gravity;

var car = new imageObj(40, 75, 20, 25, "car.png");

//var buildingBack = new rect(70, 20, 15, 50, "#0000A0");
//var halfPointHigh = new Coordinate((vanishingPoint.x + buildingBack.x) / 2, (vanishingPoint.y + buildingBack.y) / 2);
//var halfPointLow = new Coordinate((vanishingPoint.x + buildingBack.x) / 2, (vanishingPoint.y + (buildingBack.y + buildingBack.height)) / 2);
//var buildingSide = new polygon(halfPointHigh, new Coordinate(buildingBack.x, buildingBack.y), new Coordinate(buildingBack.x, buildingBack.y + buildingBack.height), halfPointLow, "blue");

// Set interval to render
var gameLoop = setInterval(renderFrame, updateInterval);

// Render Frame
function renderFrame() {
	// Update Car Position
	if (keyMap.up) {
		distanceLeft -= speed / 2;
		segmentX0.Yv = speed / 16;
		segmentX1.Yv = speed / 8;
		segmentX2.Yv = speed / 4;
		segmentX3.Yv = speed / 2;
		segmentX4.Yv = speed;
		if (segmentX1.point3.y >= segmentX2Y) {
			segmentX0.point1.y = segmentX0Y;
			segmentX0.point2.y = segmentX0Y;
			segmentX0.point3.y = segmentX0Y + 0.1;
			segmentX0.point4.y = segmentX0Y + 0.1;
			segmentX1.point1.y = segmentX1Y;
			segmentX1.point2.y = segmentX1Y;
			segmentX1.point3.y = segmentX1Y + 0.1;
			segmentX1.point4.y = segmentX1Y + 0.1;
			segmentX2.point1.y = segmentX2Y;
			segmentX2.point2.y = segmentX2Y;
			segmentX2.point3.y = segmentX2Y + 0.1;
			segmentX2.point4.y = segmentX2Y + 0.1;
			segmentX3.point1.y = segmentX3Y;
			segmentX3.point2.y = segmentX3Y;
			segmentX3.point3.y = segmentX3Y + 0.1;
			segmentX3.point4.y = segmentX3Y + 0.1;
			segmentX4.point1.y = segmentX4Y;
			segmentX4.point2.y = segmentX4Y;
			segmentX4.point3.y = segmentX4Y + 0.1;
			segmentX4.point4.y = segmentX4Y + 0.1;
		}
	}
	else {
		segmentX0.Yv = 0;
		segmentX1.Yv = 0;
		segmentX2.Yv = 0;
		segmentX3.Yv = 0;
		segmentX4.Yv = 0;
	}
	if (vanishingPoint.y < 49) {
		vanishingPoint.y++;
		sky.height = vanishingPoint.y + 1;
	}
	else {
		vanishingPoint.y = 50;
		sky.height = vanishingPoint.y + 1;
	}
	if (vanishingPoint.x < 49) {
		vanishingPoint.x++;
	}
	else {
		vanishingPoint.x = 50;
	}
	if (keyMap.right) {
		obstacle.x -= 0.5;
		speedUp.x -= 0.5;
		road.point3.x -= turnSpeed;
		road.point4.x -= turnSpeed;
		leftW.point2.x -= turnSpeed;
		leftW.point3.x -= turnSpeed;
		rightW.point2.x -= turnSpeed;
		rightW.point3.x -= turnSpeed;
		leftY.point2.x -= turnSpeed;
		leftY.point3.x -= turnSpeed;
		rightY.point2.x -= turnSpeed;
		rightY.point3.x -= turnSpeed;
		segment1.point2.x -= turnSpeed;
		segment1.point3.x -= turnSpeed;
		segment2.point2.x -= turnSpeed;
		segment2.point3.x -= turnSpeed;
	}
	else if (keyMap.left) {
		obstacle.x += 0.5;
		speedUp.x += 0.5;
		road.point3.x += turnSpeed;
		road.point4.x += turnSpeed;
		leftW.point2.x += turnSpeed;
		leftW.point3.x += turnSpeed;
		rightW.point2.x += turnSpeed;
		rightW.point3.x += turnSpeed;
		leftY.point2.x += turnSpeed;
		leftY.point3.x += turnSpeed;
		rightY.point2.x += turnSpeed;
		rightY.point3.x += turnSpeed;
		segment1.point2.x += turnSpeed;
		segment1.point3.x += turnSpeed;
		segment2.point2.x += turnSpeed;
		segment2.point3.x += turnSpeed;
	}
	
	// Obstacle Movement and Collision Check
	if (obstacle.y > 100) {
		obstacle.x = random(10, 80);
		obstacle.y = -10;
		obstacle.Yv = obstacleExtraSpeed;
	}
	
	if (speedUp.y > 100) {
		speedUp.x = random(10, 80);
		speedUp.y = -10;
		speedUp.Yv = 0;
	}
	
	if (objectCollision(car, obstacle)) {
		clearInterval(gameLoop);
		document.getElementById("toolbar").innerHTML = 'Game Over | <a href="index.html" style="color: dodgerblue;">Restart Game</a>';
		clearObjects();
		new textObj("Game Over", 10, 10, "36px Arial", "white", "center");
	}
	else if (objectCollision(car, speedUp)) {
		speed = 2;
		setTimeout(function() {
			speed = 1;
		}, 5000);
	}
	
	if (distanceLeft <= 0) {
		clearInterval(gameLoop);
		document.getElementById("toolbar").innerHTML = 'Win | <a href="index.html" style="color: dodgerblue;">Restart Game</a>';
		clearObjects();
		new textObj("Win", 10, 10, "48px Arial", "#00d020", "center");
	}
	
	// Render Frame
	updateAll();
	
	// Update Toolbar
	document.getElementById("distanceLeft").innerHTML = Math.floor(distanceLeft);
	
	// Update Stats (Press S during gameplay to display)
	document.getElementById("vanishing-point").innerHTML = "(" + vanishingPoint.x + ", " + vanishingPoint.y + ")";
	document.getElementById("horizon-y").innerHTML = sky.height + "%";
	document.getElementById("canvas-w").innerHTML = canvas.width;
	document.getElementById("canvas-h").innerHTML = canvas.height;
	document.getElementById("speed").innerHTML = speed;
}