var ConversationCollection = require('../models/conversation');
var convObj = new ConversationCollection();

function Conversation() {}

Conversation.prototype.storeConversation = function(conversationObj,callback){
    convObj.storeConv(conversationObj,callback);
}

module.exports = Conversation;