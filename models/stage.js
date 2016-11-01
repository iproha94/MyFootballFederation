var mongoose = require('mongoose');
var Match = require('../models/match');

var Schema = mongoose.Schema;

var stageSchema = new Schema({
    name: String,
    tournament: Schema.Types.ObjectId,
    teams: [Schema.Types.ObjectId],
    type: Object,
    federation: Schema.Types.ObjectId
});

var Stage = mongoose.model("Stage", stageSchema);

Stage.types = {
    liga: {
        name: "Лига",

        createMatches: function (teams, numberMatchesTwoTeams) {
            var matches = [];

            for (var i = 0; i < teams.length; ++i) {
                for (var j = i + 1; j < teams.length; ++j) {
                    for (var k = 0; k < numberMatchesTwoTeams; ++k) {
                        matches.push(new Match ({
                            team1: teams[i],
                            team2: teams[j]
                        }));
                    }
                }
            }

            return matches;
        }
    },
    playoff: {
        name: "Плей Офф",

        createMatches: function (teams) {
            return [];
        }
    },
    group: {
        name: "Группа",
    }
};

module.exports = Stage;