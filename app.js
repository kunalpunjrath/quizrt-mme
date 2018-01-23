const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;



//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  socket.on('game start', function(msg){
    io.emit('game start', msg);
  });
  socket.on('game end', function(msg){
    io.emit('game end', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
