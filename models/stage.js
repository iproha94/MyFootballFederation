var mongoose = require('mongoose');
var Match = require('../models/match');

var Schema = mongoose.Schema;

var stageSchema = new Schema({
    name: String,
    teams: [Schema.Types.ObjectId],
    mathes: [Schema.Types.ObjectId],
    type: Object,
});

var Stage = mongoose.model("Stage", stageSchema);

Stage.types = [
    {
        title: "liga",
        name: "Лига",

        createMatches: function (teams, numberMatchesTwoTeams) {
            var matches = [];

            for (var i = 0; i < teams.length; ++i) {
                for (var j = i + 1; j < teams.length; ++j) {
                    for (var k = 0; k < numberMatchesTwoTeams; ++k) {
                        var match = new Match ({
                            team1: teams[i],
                            team2: teams[j]
                        });

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
    {
        title: "playoff",
        name: "Плей Офф",

        createMatches: function (teams) {
            return [];
        }
    },
    {
        title: "group",
        name: "Группа",

    },
];

module.exports = Stage;