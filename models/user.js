var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	authId: String,
    name: String,
    created: Date,
    image: String,
    matchesToReferee: [Schema.Types.ObjectId],
    email: String,
    notifications: Boolean
});

var User = mongoose.model("User", userSchema);
module.exports = User;