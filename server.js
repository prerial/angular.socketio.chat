var express = require("express");
var app = express();
var http = require("http").Server(app);
var path = express("path");
var io = require("socket.io")(http);
var server = require('http').createServer(app)
app.use(express.static(__dirname + '/client'));
app.set('port', process.env.PORT || 3000);

io.on("connection", function(socket){
    socket.on("chat", function(msg){
        console.log(msg);
        io.emit("chat", msg);
    });
    socket.on("video", function(msg){
        io.emit("video", msg);
    });
    socket.on("audio", function(msg){
        io.emit("audio", msg);
    });
});

http.listen(3000, function(){
  console.log('listening on: 3000');
});
