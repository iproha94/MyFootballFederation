var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vuserSchema = new Schema({
    name: String,
});

var Vuser = mongoose.model("Vuser", vuserSchema);
module.exports = Vuser;