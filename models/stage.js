var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stageSchema = new Schema({
    name: String,
    teams: [Schema.Types.ObjectId],
    mathes: [Schema.Types.ObjectId],
    type: Object, //types[...] in lib/stage.js
});

var Stage = mongoose.model("Stage", stageSchema);
module.exports = Stage;