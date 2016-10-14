var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    messages: [{
        userName: String,
        text: String,
        time: String
    }],
    match: Schema.Types.ObjectId
});

var Chat = mongoose.model("Chat", federationSchema);
module.exports = Federation;