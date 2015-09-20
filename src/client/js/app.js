var io = require('socket.io-client');
var socket;

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
var clickSize = new Array();
var clickColour = new Array();
var curSize = "normal";


var colourPurple = "#cb3594";
var colourGreen = "#659b41";
var colourYellow = "#ffcf33";
var colourBrown = "#986928";

playerColour = colourPurple;

function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColour.push(playerColour);
  clickSize.push(curSize);
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
	 //Clear button
	 var clearBtn = document.getElementById('Clear');
	 clearBtn.onclick = function(){
		clickX = new Array();
		clickY = new Array();
		clickDrag = new Array();
		clickSize = new Array();
		clickColour = new Array();
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
		initCanvasWithImage(image)
	 }
	 //Colour buttons
	 var purpleBtn = document.getElementById('Purple');
	 purpleBtn.onclick = function() {
		 playerColour = colourPurple;
	 }
	 var greenBtn = document.getElementById('Green');
	 greenBtn.onclick = function() {
		 playerColour = colourGreen;
	 }
	 var yellowBtn = document.getElementById('Yellow');
	 yellowBtn.onclick = function() {
		 playerColour = colourYellow;
	 }
	 var brownBtn = document.getElementById('Brown');
	 brownBtn.onclick = function() {
		 playerColour = colourBrown;
	 }
	 //Size buttons
	 var smallBtn = document.getElementById('Small');
	 smallBtn.onclick = function() {
		 curSize = "small";
	 }
	 var normBtn = document.getElementById('Normal');
	 normBtn.onclick = function(){
		 curSize = "normal";
	 }
	 var largeBtn = document.getElementById('Large');
	 largeBtn.onclick = function(){
		 curSize = "large";
	 }
	 var hugeBtn = document.getElementById('Huge');
	 hugeBtn.onclick = function(){
		 curSize = "huge";
	 }
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
	ctx.lineJoin = "round";
	var radius;
		
  for(var i=0; i < clickX.length; i++) {		
    ctx.beginPath();
    if(clickDrag[i] && i){
      ctx.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       ctx.moveTo(clickX[i]-1, clickY[i]);
     }
	 switch (clickSize[i]) {
				case "small":
					radius = 2;
					break;
				case "normal":
					radius = 5;
					break;
				case "large":
					radius = 10;
					break;
				case "huge":
					radius = 20;
					break;
				default:
					break;
				}
     ctx.lineTo(clickX[i], clickY[i]);
     ctx.closePath();
	 ctx.strokeStyle = clickColour[i];
	 ctx.lineWidth = radius;
     ctx.stroke();
  }
}

	// To manage touch events for mobile
    // http://ross.posterous.com/2008/08/19/iphone-touch-events-in-javascript/

    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);

    function touchHandler(event)
    {
        var touches = event.changedTouches,
            first = touches[0],
            type = '';
        switch(event.type)
        {
            case "touchstart":
                type = "mousedown";
                break;
           case "touchmove":
                type = "mousemove";
                break;
            case "touchend":
                type = "mouseup";
                break;
            default:
                return;
        }

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1,
            first.screenX, first.screenY,
            first.clientX, first.clientY, false,
            false, false, false, 0/*left*/, null);

        first.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
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
