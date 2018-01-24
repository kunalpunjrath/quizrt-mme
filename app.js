const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;

const onPlayerWaiting = require('./server/room.controller.js');



//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.get('/startgame', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var gamedata = {};
var gameid = "someId";
var start = io
  .of('/start')
  .on('connection', function (socket) {  
    console.log('connected dude');
     
    socket.on('game start', function(msg){
      console.log("Time to start");
      onPlayerWaiting(start, msg.playerid, msg.topicid);
    });
    
  });

var gameison = io
  .of('/'+gameid)
  .on('connection', function (socket) {  
    console.log('game is on');     
    socket.on('play now', function(msg){
          console.log("Message from UI ::: "+msg);          
          gameison.emit('question', "send some questions");
    });    
  });

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
