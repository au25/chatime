var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);
console.log("Server is up!");

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log("Socket is working!");
  socket.on('send msg', function(data) {
    io.emit('new msg', {name: data, msg: data});    
  });
});