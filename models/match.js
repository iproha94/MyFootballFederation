var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    _tour: Number,
    team1: Schema.Types.ObjectId,
    team2: Schema.Types.ObjectId
    //todo добавить 2 массива игроков от каждой комнды
});

var Match = mongoose.model("Match", matchSchema);
module.exports = Match;