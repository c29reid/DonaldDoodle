var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + '/../client'));
var port = 6655;

http.listen( port, function() {
		console.log('Started server on port :' + port);
	});


io.on('connection', function(socket) {
	console.log('A user joined', socket.handshake.query.type);	
});
