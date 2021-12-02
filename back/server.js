let express = require('express');
let app = express();
const cors = require('cors');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
let serv_port = 5000 ;

mongoose.connect("mongodb+srv://group:fLJzHxm7XmRTSf2y@cluster0.fvehm.mongodb.net/collab_whiteboard?retryWrites=true&w=majority")
    .catch(err => {
        console.log("Authentification to mongoose failed")
        console.log(err.message)
    });

mongoose.connection.once('open', () => { console.log("MongoDB database connection established successfully") });


io.on('connection', (socket) => {
    console.log("New user online");
    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data);
    })
})

const userRoutes = require('./routes/users')
const authRoutes = require('./routes/authentification')

app.use('/', authRoutes);
app.use('/users', userRoutes);

http.listen(serv_port, () => {
    console.log("Port: " + serv_port);
})