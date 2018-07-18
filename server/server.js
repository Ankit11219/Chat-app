const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app  = express();
var server = http.createServer(app);
app.use(express.static(publicPath));

var io = socketIO(server);

io.on('connection',function(socket){  //in here socket come value of index.html var socket = io(); variable 
    console.log('newuser connected');

    socket.on('createMessage',function(message){
        console.log('createMessage',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createAt:new Date().getTime()
        });
    });
        socket.emit('newMessage',{
            from:'Admin',
            text:'Welcome to Chat App'
        });

        /* this will brodcast the message except those whose send will not get message*/
        socket.broadcast.emit('newMessage',{
            from:'Admin',
            text:'new user join',
            createAt:new Date().getTime()
        });


    socket.on('disconnect',function(){
        console.log('user was disconnected');
    });
});
server.listen(port,function(){
console.log(`Server is up on ${port}`);
});