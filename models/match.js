var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    tournament: Schema.Types.ObjectId,
    team1: Schema.Types.ObjectId,
    team2: Schema.Types.ObjectId
    //добавить 2 массива иггроков от каждой комнды
});

var Match = mongoose.model("Match", matchSchema);
module.exports = Match;