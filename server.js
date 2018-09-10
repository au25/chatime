var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);
console.log("Server is up!");

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    console.log("Socket is working!");
    socket.on('send msg', function(data) {
        console.log("Server: " + data);
        io.sockets.emit('new msg', {msg: data});
  });
});