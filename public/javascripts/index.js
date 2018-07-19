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

socket.on('newLocationMessage',function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current Location</a>')
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
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
});


var locationButton= $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation donot support your browser');
    }


    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('Unable to fetch location');
    });
});


