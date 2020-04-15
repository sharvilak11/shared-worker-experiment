importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js');
const socket = io('http://localhost:7677');
let connections = 0;

self.addEventListener("connect", function (e) {
    const port = e.ports[0];
    connections++;

    port.addEventListener("message", function (e) {
        port.postMessage(`Tab ${connections} has connected to Shared Worker`);
    }, false);

    port.start();

    socket.on('LOCATIONUPDATED', (data) => {
        // Send the location back to Vue, our Frontend
        port.postMessage(data);
    });

    socket.on('connect', function () {
        port.postMessage('socket connection established');
    });

    socket.on('disconnect', function () {
        port.postMessage('socket disconnected');
    });

}, false);
