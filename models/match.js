var mongoose = require('mongoose');
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

Match.EVENT = {
    MATCH_START : {value: 0, name: "MATCH_START"},
    MATCH_END: {value: 1, name: "MATCH_END"},
    TIME_START : {value: 2, name: "TIME_START"},
    TIME_END : {value: 3, name: "TIME_END"},
    GOAL : {value: 4, name: "GOAL"},
    OWN_GOAL : {value: 5, name: "OWN_GOAL"},
    YELLOW_CARD : {value: 6, name: "YELLOW_CARD"},
    RED_CARD : {value: 7, name: "RED_CARD"},
};

Match.STATUS = {
    CREATED : {value: 0, name: "CREATED"},
    RUNNING: {value: 1, name: "RUNNING"},
    FINISHED : {value: 2, name: "FINISHED"},
};

module.exports = Match;