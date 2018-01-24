const Room = require('./room.model.js');

let waitingRooms = [];
let socket;

//Room functions

const onPlayerWaiting = function(currentSocket, playerId, topicId) {
  socket = currentSocket;
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
  socket.broadcast.emit('broadcast(): player ' + playerId + ' joined room with topic' + topicId);
  console.log(`Room Create ${topicId}`);
  const room = new Room(topicId, onRoomTimeOut, onRoomFull);
  room.addPlayer(playerId);
  waitingRooms.push(room);
  console.log(`Queue Size ${waitingRooms.length}`);
  socket.emit("playerConnected", {playerId, topicId});
  console.info(`room ${topicId} player size ${room.players.length}`);
};

const updateRoom = function(room, playerId) {
  if (room.isAvailable) {
    socket.broadcast.emit('broadcast(): player ' + playerId + ' joined room with topic' + room.topicId);
    room.addPlayer(playerId);
    socket.emit("playerConnected", {playerId, topicId: room.topicId});
  }
};

const removeRoom = function(topicId) {
  const roomIndex = waitingRooms.findIndex((r) => {
    return r.topicId === topicId;
  });
  if(roomIndex !== -1) {
    waitingRooms.splice(roomIndex, 1);
    socket.broadcast.emit('broadcast(): Room with topic ' + topicId + 'has been closed');
    console.log(`room ${topicId} removed. Queue Size ${waitingRooms.length}`);
  } else {
    console.log(`Invalid Room ${topicId}`);
  }
};

const onRoomTimeOut = function(topicId, players) {
  console.log(`On Room ${topicId} Timeout`);
  removeRoom(topicId);
  if (players.length < 2) {
    socket.emit("roomDissolved", {topicId});
  } else {
    joinGame(topicId, players);
  }
}

const onRoomFull = function(topicId, players) {
  removeRoom(topicId);
  joinGame(topicId, players);
}

const joinGame = function(topicId, players) {
  // Call GE Rest API to get game id and emit to players.
  console.log(`Join Game ${topicId}`);
  socket.emit("startGame", {gameId: "g1", topicId, players});
}

module.exports = onPlayerWaiting;