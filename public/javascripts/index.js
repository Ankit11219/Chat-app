var socket = io();  //it create socket connection in js


socket.on('connect',function(){
    console.log('Connected server successfully');
});

socket.on('newMessage',function(message){
    console.log("Message from server",message);
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});



