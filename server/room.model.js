class Room {
  constructor(roomId, topicId, onRoomTimeOut, onRoomFull) {
    this.roomId = roomId;
    this.topicId = topicId;
    this.players = [];
    this.playersLimit = 4;
    this.roomAvailable = true;
    this.roomAliveTime = 20;
    this.roomTimeOut = onRoomTimeOut;
    this.roomFull = onRoomFull;
  };

  addPlayer(playerId) {
    if (roomAvailable) {
      this.players.push(playerId);
      this.roomAvailable = this.players.length < this.playersLimit;
      let time;
      if (this.players.length === 1) {
        time = setTimeout(function(){ this.roomTimeOut(this.roomId, this.players.length) }, this.roomAliveTime * 1000);
      } else if (!this.roomAvailable) {
        clearTimeout(time);
        this.roomFull(this.roomId);
      }
    }
  };

  removePlayer(playerId) {
    var i = this.players.indexOf(playerId);
    if(i != -1) {
      this.players.splice(i, 1);
    }
  };

  get topicId() {
    return this.topicId;
  };

  get roomId() {
    return this.roomId;
  };

  isAvailable() {
    return this.roomAvailable;
  };
};

module.exports = Room;
