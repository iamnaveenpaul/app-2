var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function ConversationModel(){};

var conversationSchema = new Schema({
    date:{type: Date, required: true},
    text:{type: String, required: true},
    userName:{type: String, required: true}
});

const Conversation = mongoose.model('conversation', conversationSchema);

ConversationModel.prototype.storeConv = function(message,callback){
    const obj  = new Conversation(message);

    obj.save(function(err,results){
        if(callback){
            callback(err,results)
        }
    })
}

ConversationModel.prototype.getAllMessages(callback){
    Conversation.find().exec(callback)
}


module.exports = ConversationModel;