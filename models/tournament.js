var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tournamentSchema = new Schema({
    name: String,
    federation: Schema.Types.ObjectId,
    teams: [Schema.Types.ObjectId],
    team_requests: [Schema.Types.ObjectId],
    type: Object
});

var Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;