var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: String,
    city: String,
    logo: String,
    creators: [Schema.Types.ObjectId],
    players: [Schema.Types.ObjectId],
    vplayers: [Schema.Types.ObjectId]
});

var Team = mongoose.model("Team", teamSchema);
module.exports = Team;