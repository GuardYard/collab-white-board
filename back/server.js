let app = require('express')();
const cors = require('cors');
let http = require('http').createServer(app);
let io = require('socket.io')(http, {cors: {origin: "*"}});
app.use(cors());

io.on('connection', (socket) => {
    console.log("New user online");
    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data);
    })
})

let serv_port = process.env.LOCAL_PORT || process.env.PORT || 5000;
http.listen(serv_port, () => {
    console.log("Port: " + serv_port);
})