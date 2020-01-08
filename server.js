const express = require('express');
const app = express();
const server = app.listen(4000);
const io = require('socket.io').listen(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', socket => {
    console.log("User connection ...");

    socket.on('disconnect', () => {
        console.log("User disconnect ...");
    });

    socket.on('message', message => {
        console.log('message', message);
        //Broadcast
        io.emit('message', message);
    });
});


