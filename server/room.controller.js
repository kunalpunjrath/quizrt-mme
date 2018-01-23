const Room = require('./room.model.js');

let waitingRooms = [];

//Room functions

const onPlayerWaiting = function(playerId, topicId) {
  const roomIndex = waitingRooms.findIndex((r) => {
    return r.topicId === topicId;
  });
  if(roomIndex !== -1) {
    updateRoom(waitingRooms[roomIndex], playerId);
  } else {
    createRoom(topicId, playerId);
  }
}

const createRoom = function(topicId, playerId) {
  //socket.broadcast.emit('broadcast(): player ' + playerId + ' joined room with topic' + topicId);

  const room = new Room(topicId, onRoomTimeOut, onRoomFull);
  room.addPlayer(playerId);
  waitingRooms.push(room);
  //socket.emit("playerConnected", {playerId, topicId});    
};

const updateRoom = function(room, playerId) {
  if (room.isAvailable) {
    //socket.broadcast.emit('broadcast(): player ' + playerId + ' joined room with topic' + topicId);
    room.addPlayer(playerId);
    //socket.emit("playerConnected", {playerId, topicId});
  }
};

const removeRoom = function(topicId) {
  const roomIndex = waitingRooms.findIndex((r) => {
    return r.topicId === topicId;
  });
  if(roomIndex !== -1) {
    waitingRooms.splice(roomIndex, 1);
    //socket.broadcast.emit('broadcast(): Room with topic ' + topicId + 'has been closed');
  } else {
    // Invalid Room id.
  }
};

const onRoomTimeOut = function(topicId, players) {
  removeRoom(topicId);
  if (players.length < 2) {
    //socket.emit("roomDissolved", {roomId});
  } else {
    startGame(topicId, players);
  }
}

const onRoomFull = function(topicId, players) {
  removeRoom(topicId);
  startGame(topicId, players);
}

const startGame = function(topicId, players) {
  // Call GE Rest API to get game id and emit to players.
}