const socketIO = require('socket.io');
const http = require('http');
const { run } = require('./gpx/helper');

const socketPort = process.env.SOCKET_PORT;

const app = http.createServer();
const io = socketIO(app);

app.listen(socketPort, () => {
    console.log("Sockets started at " + socketPort);
});

// Run the gpx path - this is the place from where gpx will be run
run(io);

io.on('connection', (socket) => {
    console.log(socket.id + ' got connected to sockets');
});

module.exports = io;
