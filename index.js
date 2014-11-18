var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/templates/index.html');
});

io.on('connection', function(socket){
  socket.emit('chat message', function () {
    io.emit('chat message', 'A user has joined')
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(4000, function () {
  console.log('listening on *:4000');
});