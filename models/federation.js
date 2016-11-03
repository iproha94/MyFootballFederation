var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var federationSchema = new Schema({
    name:  { type : String , unique : true},
    city: String,
    creators: [Schema.Types.ObjectId],
});

var Federation = mongoose.model("Federation", federationSchema);
module.exports = Federation;