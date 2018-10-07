const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

//servers the file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, + 'public/index.html'));
})

io.on('connect', socket => {
    console.log("connected");

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })

    socket.on('message', msg => {
        console.log('message', msg);
        //broadcase the message
        io.emit('message', msg);
    })
})

http.listen(3000, () => {
    console.log('hiiiiii listening to port 3000');
});