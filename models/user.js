var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	authId: String,
    name: String,
    teams: [Schema.Types.ObjectId],
    federations: [Schema.Types.ObjectId]
});

var User = mongoose.model("User", userSchema);
module.exports = User;