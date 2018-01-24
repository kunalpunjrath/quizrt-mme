class Room {
  constructor(topicId, onRoomTimeOut, onRoomFull) {
    this._topicId = topicId;
    this.players = [];
    this.playersLimit = 4;
    this.roomAvailable = true;
    this.roomAliveTime = 20;
    this.roomTimeOut = onRoomTimeOut;
    this.roomFull = onRoomFull;
    this.timer;
  };

  addPlayer(playerId) {
    if (this.roomAvailable) {
      this.players.push(playerId);
      console.log(`room ${this._topicId} player size ${this.players.length}`);
      this.roomAvailable = (this.players.length < this.playersLimit);
      console.log(`Room Availability ${this.roomAvailable}`);
      const onTimeOut = this.roomTimeOut;
      const topic = this._topicId;
      const playersArr = this.players;
      if (this.players.length === 1) {        
        this.timer = setTimeout(function(){ onTimeOut(topic, playersArr) }, this.roomAliveTime * 1000);
      } else if (!this.roomAvailable) {
        console.log('Room full. Clear timer.');
        clearTimeout(this.timer);
        this.roomFull(this._topicId, this.players);
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
    return this._topicId;
  };

  isAvailable() {
    return this.roomAvailable;
  };
};

module.exports = Room;
