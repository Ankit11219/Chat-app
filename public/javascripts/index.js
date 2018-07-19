var socket = io();  //it create socket connection in js


socket.on('connect',function(){
    console.log('Connected server successfully');
});

socket.on('newMessage',function(message){
    console.log("Message from server",message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);
});



socket.on('disconnect',function(){
    console.log('Disconnected from server');
});



$("#message-form").on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'Yash',
        text:$('[name=message]').val()
    },function(){

    });
})


