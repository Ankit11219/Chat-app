var socket = io();  //it create socket connection in js


socket.on('connect',function(){
    console.log('Connected server successfully');
});

socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $("#messages").append(html);
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        createdAt: formattedTime,
        url: message.url

    });
    $("#messages").append(html);
});


socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

var messageTextbox = $('[name=message]');

$("#message-form").on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'Yash',
        text:messageTextbox.val()
    },function(){
        messageTextbox.val('');
    });
});


var locationButton= $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation donot support your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});


