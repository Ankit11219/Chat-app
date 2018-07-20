const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app  = express();
var server = http.createServer(app);
app.use(express.static(publicPath));

var io = socketIO(server);

io.on('connection',function(socket){  //in here socket come value of index.html var socket = io(); variable 
    console.log('newuser connected');

    socket.on('join',function(params,cb){
        if(!isRealString(params.name) || !isRealString(params.room)){
            cb('Name and group name are required.');
        }

        socket.join(params.room);
        socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

        /* this will brodcast the message except those whose send will not get message*/
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        cb();
    });

    socket.on('createMessage',function(message,cb){
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        cb();
    });

    socket.on('createLocationMessage',function(coords){
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });



    socket.on('disconnect',function(){
        console.log('user was disconnected');
    });
});
server.listen(port,function(){
console.log(`Server is up on ${port}`);
});