const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app  = express();
var server = http.createServer(app);
app.use(express.static(publicPath));

var io = socketIO(server);

io.on('connection',function(socket){  //in here socket come value of index.html var socket = io(); variable 
    console.log('newuser connected');

    socket.on('createMessage',function(message,cb){
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        cb('This is from the server');
    });
        socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

        /* this will brodcast the message except those whose send will not get message*/
        socket.broadcast.emit('newMessage',generateMessage('Admin','New user join'));


    socket.on('disconnect',function(){
        console.log('user was disconnected');
    });
});
server.listen(port,function(){
console.log(`Server is up on ${port}`);
});