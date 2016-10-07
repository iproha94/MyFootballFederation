var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tournamentSchema = new Schema({
    name: String,
    logo: String,
    federation: Schema.Types.ObjectId,
    stages: [Schema.Types.ObjectId],
    teams_requests: [Schema.Types.ObjectId],
    tournamentConfig: Object,
    matchConfig: Object,
    rating: Boolean, //влияет ли турнир на рейтинг
    status: {
        prepare: Boolean,
        undertake: Boolean,
        finished: Boolean
    }
});

var Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;