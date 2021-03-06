const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app  = express();
var server = http.createServer(app);
app.use(express.static(publicPath));

var io = socketIO(server);
var users = new Users();

io.on('connection',function(socket){  //in here socket come value of index.html var socket = io(); variable 
    console.log('newuser connected');

    socket.on('join',function(params,cb){
        if(!isRealString(params.name) || !isRealString(params.room)){
            return cb('Name and group name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

        /* this will brodcast the message except those whose send will not get message*/
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        cb();
    });

    socket.on('createMessage',function(message,cb){
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        
        cb();
    });

    socket.on('createLocationMessage',function(coords){
        var user = users.getUser(socket.id);
        if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });



    socket.on('disconnect',function(){
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
        }
    });
});
server.listen(port,function(){
console.log(`Server is up on ${port}`);
});