var expect = require('expect');
var {generateMessage} = require('./message');

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