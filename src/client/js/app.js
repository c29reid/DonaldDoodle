var canvas = document.getElementById('cvs');
var ctx = canvas.getContext("2d");

cursorRadius = 5
playerColour = '#424';

function drawCircle(x, y) {
	x -= 8;
	y -= 8;
	ctx.beginPath();
	ctx.fillStyle = playerColour;
	ctx.arc(x, y, cursorRadius, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
}

function handleDraw() {
	drawCircle(event.pageX, event.pageY);
}

window.onload = function(){ 
	canvas.addEventListener("mousedown", handleDraw, false);
}