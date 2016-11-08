var mongoose = require('mongoose');
var events = require('../cfg/matchEvents');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    _tour: Number,
    name: String,
    team1: Schema.Types.ObjectId,
    team2: Schema.Types.ObjectId,
    stage: Schema.Types.ObjectId,
    status: String,
    events: [{
        idTeam: Schema.Types.ObjectId,
        idPlayer: Schema.Types.ObjectId,
        idEvent: String,
        minute: Number,
        idAction: Number,
    }],
    federation: Schema.Types.ObjectId
    //todo добавить 2 массива игроков от каждой комнды
});

var Match = mongoose.model("Match", matchSchema);

Match.EVENT = events;

Match.STATUS = {
    CREATED : {value: 0, name: "CREATED"},
    RUNNING: {value: 1, name: "RUNNING"},
    FINISHED : {value: 2, name: "FINISHED"},
};

module.exports = Match;