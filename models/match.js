var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    _tour: Number,
    name: String,
    team1: Schema.Types.ObjectId,
    team2: Schema.Types.ObjectId,
    stage: Schema.Types.ObjectId,
    status: Number,
    events: [{
        idTeam: Schema.Types.ObjectId,
        idPlayer: Schema.Types.ObjectId,
        idEvent: Number,
        minute: Number,
        idAction: Number,
    }],
    federation: Schema.Types.ObjectId
    //todo добавить 2 массива игроков от каждой комнды
});

var Match = mongoose.model("Match", matchSchema);
module.exports = Match;