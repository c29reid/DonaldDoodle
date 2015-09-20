cursorRadius = 5;
playerColour = '#0000FF';
var KEY_ENTER = 13;
var playerName;
var playerType;
var image;

mouseDown = false;



function startGame(type) {
    playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '').substring(0,25);
    playerType = type;
	image = imageInput.value;

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    document.getElementById('startMenuWrapper').style.maxHeight = '0px';
    document.getElementById('gameAreaWrapper').style.opacity = 1;
	
	initCanvasWithImage(image);
	canvas.addEventListener("mousedown", handleMouseDown, false);
	canvas.addEventListener("mousemove", handleMouseMove, false);
	canvas.addEventListener("mouseup", endDraw, false);
	canvas.addEventListener("mouseout", endDraw, false);

}

window.onload = function() {

	var btn = document.getElementById('startButton');
	btn.onclick = function() {
		startGame('player');

	}
	 playerNameInput.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
		
		if (key === KEY_ENTER) {
			startGame('player');
		}
	 }, false);
}

var canvas = document.getElementById('cvs');
var ctx = canvas.getContext("2d");




function drawCircle(x, y) {
	ctx.beginPath();
	ctx.fillStyle = playerColour;
	ctx.arc(x, y, cursorRadius, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left, 
		y: evt.clientY - rect.top
	}
}

function handleMouseDown(evt) {
	var mousePos = getMousePos(canvas, evt)
	drawCircle(mousePos.x, mousePos.y);
	mouseDown = true;
}

function handleMouseMove(evt) {
	if (mouseDown) {
		var mousePos = getMousePos(canvas, evt)
		drawCircle(mousePos.x, mousePos.y);
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