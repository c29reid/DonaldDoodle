var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + '/../client'));
var port = 6655;

http.listen( port, function() {
	console.log('Started server on port :' + port);
});

var sockets = new Array();

io.on('connection', function(socket) {
	console.log('A user joined', socket.handshake.query.type);

	sockets.push(socket);
	socket.on('draw', function(data) {

		sockets.forEach(function(socket) {
			if (socket.id != data.id) {
				socket.emit( 'update_draw', data);
			}
		});
	});
	socket.on('new_background', function(data) {
		console.log(data.img);
		io.sockets.emit('background_changed', data);
	});	

});
