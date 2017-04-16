var app = require('./express')();
var server = require('http').Server(app);
var io = require('./socket.io')(server);

app.get('/', function(req, res){
  res.sendfile("index.html");
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on('chat message', function(msg){
	    io.emit('chat message', msg);
	    socket.broadcast.emit('hi');
	 });
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


server.listen(3000);