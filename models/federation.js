var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var federationSchema = new Schema({
    name: String,
    creators: [Schema.Types.ObjectId],
});

var Federation = mongoose.model("Federation", federationSchema);
module.exports = Federation;