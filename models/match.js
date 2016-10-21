var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    _tour: Number,
    name: String,
    team1: Schema.Types.ObjectId,
    team2: Schema.Types.ObjectId,
    stage: Schema.Types.ObjectId,
    events: [{
        number: Number,
        data: String,
    }],
    chat: [{
        user: Object,
        message: String,
        time: String
    }]
    //todo добавить 2 массива игроков от каждой комнды
});

var Match = mongoose.model("Match", matchSchema);
module.exports = Match;