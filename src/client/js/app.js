var canvas = document.getElementById('cvs');
var ctx = canvas.getContext("2d");

cursorRadius = 5;
playerColour = '#0000FF';

mouseDown = false;

function drawCircle(x, y) {
	x -= 8;
	y -= 8;
	ctx.beginPath();
	ctx.fillStyle = playerColour;
	ctx.arc(x, y, cursorRadius, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
	
}

function handleMouseDown() {
	drawCircle(event.pageX, event.pageY);
	mouseDown = true;
}

function handleMouseMove() {
	if (mouseDown) {
		drawCircle(event.pageX, event.pageY);
	}
}

function endDraw() {
	mouseDown = false;
}

function initCanvasWithImage(url) {
	var img = new Image;
	img.onload = function() {
		var scale = 1;
		canvas.height = scale*this.height;
		canvas.width = scale*this.width;
		ctx.drawImage(img, 0, 0, this.width, this.height,
							0, 0, scale*this.width, scale*this.height);
	}
	img.src = url;

}

window.onload = function(){ 
	initCanvasWithImage("https://a248.e.akamai.net/f/1202/1579/4m/i.dailymail.co.uk/i/pix/2014/10/06/1412613364603_wps_17_SANTA_MONICA_CA_AUGUST_04.jpg");	
	canvas.addEventListener("mousedown", handleMouseDown, false);
	canvas.addEventListener("mousemove", handleMouseMove, false);
	canvas.addEventListener("mouseup", endDraw, false);
	canvas.addEventListener("mouseout", endDraw, false);
	
	
}