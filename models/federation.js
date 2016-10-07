var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var federationSchema = new Schema({
    name: String,
    city: String,
    logo: String,
    creators: [Schema.Types.ObjectId],
    rating: [{
        team: Schema.Types.ObjectId,
        rating: Number
    }]
});

var Federation = mongoose.model("Federation", federationSchema);
module.exports = Federation;