var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: String,
    city: String,
    motto: String,
    logo: String,
    creators: [Schema.Types.ObjectId],
    players: [Schema.Types.ObjectId],
    player_requests: [Schema.Types.ObjectId]
});

var Team = mongoose.model("Team", teamSchema);
module.exports = Team;