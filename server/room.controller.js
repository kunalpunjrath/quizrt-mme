const Room = require('./room.model.js');

let waitingRooms = [];
//Room functions
const createRoom = function(roomData) {

  const { roomId, topicId, playerId } = roomData;

  socket.broadcast.emit('broadcast(): player ' + playerId + ' joined room with topic' + topicId);

  const room = new Room(roomId, topicId, onRoomTimeOut, onRoomFull);
  waitingRooms.push();
  room.addPlayer(playerId);
  //socket.emit("playerConnected", {playerId, topicId, waitingRoomId:roomId});    
};

const updateRoom = function(room, playerId) {
  if (room.isAvailable) {
    socket.broadcast.emit('broadcast(): player ' + playerId + ' joined room with topic' + topicId);
    room.addPlayer(playerId);
    //socket.emit("playerConnected", {playerId, topicId, waitingRoomId:roomId});
  }
};

const onRoomTimeOut = function(roomId, numberOfPlayers) {
  //TODO
}

const onRoomFull = function(roomId) {
 //TODO 
}