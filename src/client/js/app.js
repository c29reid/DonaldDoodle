var io = require('socket.io-client');
var socket;

var cursorRadius = 5;
var playerColour = '#0000FF';
var KEY_ENTER = 13;
var playerName;
var playerType;
var image;

var mouseDown = false;

var canvas = document.getElementById('cvs');

//Save the click positions in an array
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function startGame(type) {
    playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '').substring(0,25);
    playerType = type;
	image = imageInput.value;

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    document.getElementById('startMenuWrapper').style.maxHeight = '0px';
    document.getElementById('gameAreaWrapper').style.opacity = 1;
	
    initCanvasWithImage(image);
    canvas.addEventListener("mousedown", handleMouseDown, false);
    canvas.addEventListener("mousemove", handleMouseMove, false);  
    canvas.addEventListener("mouseup", endDraw, false);
    canvas.addEventListener("mouseout", handleMouseLeave, false);

    if (!socket) {
	socket = io({});
	setupSocket(socket);
    }
}

function setupSocket(socket) {

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

var ctx = canvas.getContext("2d");

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left, 
		y: evt.clientY - rect.top
	}
}

function handleMouseDown(evt) {

	var mouseX = evt.pageX - this.offsetLeft;
  	var mouseY = evt.pageY - this.offsetTop;
		
  	mouseDown = true;
  	addClick(evt.pageX - this.offsetLeft, evt.pageY - this.offsetTop);
  	redraw();
}

function handleMouseMove(evt) {
  	if(mouseDown){
	    addClick(evt.pageX - this.offsetLeft, evt.pageY - this.offsetTop, true);
	    redraw();
  	}	
}

function handleMouseLeave(evt){
  mouseDown = false;
}

function endDraw() {
	mouseDown = false;
}

function redraw(){
  
  ctx.strokeStyle = playerColour;
  ctx.lineJoin = "round";
  ctx.lineWidth = cursorRadius;
			
  for(var i=0; i < clickX.length; i++) {		
    ctx.beginPath();
    if(clickDrag[i] && i){
      ctx.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       ctx.moveTo(clickX[i]-1, clickY[i]);
     }
     ctx.lineTo(clickX[i], clickY[i]);
     ctx.closePath();
     ctx.stroke();
  }
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
