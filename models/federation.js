var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var federationSchema = new Schema({
    name: String,
    creators: [Schema.Types.ObjectId],
    tournaments: [Schema.Types.ObjectId],
    team_requests: [Schema.Types.ObjectId]
});

var Federation = mongoose.model("Federation", federationSchema);
module.exports = Federation;