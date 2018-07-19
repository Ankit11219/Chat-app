var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',function(){
    it('should generate correct message object',function(){
        //store res in varible
        //assets form match
        //assets text match
        //assects createAt match
        var from = 'Ankit';
        var text = "Some message"
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,   // or from:from    define upper value from="Ankit"  we write both I use ES6 format
            text
        });


    });
});
describe('generateLocationMessage',function(){
    it('should generate correct Location object',function(){
        var from = 'Ankit';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from,latitude,longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url}); 
    });
});
