const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var bodyParser = require('body-parser');

var Conversation = require('./controllers/conversation');
var conversationObj = new Conversation();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/get/all/messages', function(req, res) {
    res.send([{userName:"naveen","text":"Whats up"}]);
});

mongoose.connect("mongodb://localhost/chat-app?poolSize=100",{ useNewUrlParser: true },function(error){
    if(error){
        console.log("MongoDb connection failed");
        console.log(error);
    } else {
        console.log("MongoDb connection successful");
    }
});


io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', ' <i>' + socket.username + ' joined the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', ' <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {

        conversationObj.storeConversation({
            userName:socket.username,
            text:message,
            date: new Date()
        })

        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(7000, function() {
    console.log('listening on *:7000');
});