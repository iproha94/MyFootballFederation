var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');
var Team = require('../models/team');
var Stage = require('../models/stage');
var Match = require('../models/match');
var tournamentSetting = require('../lib/tournament');
var matchSetting = require('../lib/match');

router.get('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }
    res.render("create-tournament");
});

router.post('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }

    Federation.findOne({name: req.query.federation}, function (err, federation) {

        var tournamentConfig = tournamentSetting.config;
        tournamentConfig.countPlayersInTeam = req.body.countPlayersInTeam;
        tournamentConfig.countPlayersOnField = req.body.countPlayersOnField;

        var matchConfig = matchSetting.config;
        matchConfig.countPeriods = req.body.countPeriods;
        matchConfig.timePeriod = req.body.timePeriod;

        var tournament = new Tournament({
            name: req.body.name,
            federation: federation._id,
            teams: [],
            team_requests: [],
            tournamentConfig: tournamentConfig,
            matchConfig: matchConfig,
            status: {
                prepare: true,
                undertake: false,
                finished: false
            }
        });

        tournament.save(function (err) {
            if(err) {
                return next(err);
            }
            res.redirect("/tournament/" + tournament._id);
        });
    });

});

router.get('/:idTournament', function(req, res, next) {
    var idTournament = req.params.idTournament;

    Tournament.findById(idTournament, function (err, tournament) {
        if (err) {
            return next(err);
        }

        if (req.query.setstatus === "undertake" && tournament.status.prepare) {
            tournament.status.prepare = false;
            tournament.status.undertake = true;

            tournament.save(function (err) {
                if(err) {
                    return next(err);
                }
            });

            var callback = function (err) {
                console.log("add match");
            };
            for (var i = 0; i < tournament.teams_requests.length; ++i) {
                for (var j = i + 1; j < tournament.teams_requests.length; ++j) {
                    var match = new Match ({
                        tournament: idTournament,
                        team1: tournament.teams_requests[i],
                        team2: tournament.teams_requests[j]
                    });

                    match.save(callback);
                }
            }
        }

        Match.find({tournament: tournament._id}, function (err, matches) {
            Team.find({_id: {$in: tournament.teams_requests}}, function (err, teams) {
                return res.render("tournament", {
                    tournament: tournament,
                    matches: matches,
                    teams: teams
                });
            });
        });

    });
});

router.post('/add-team', function(req, res, next) {
    Tournament.findById(req.body.idTournament, function (err, tournament) {
        tournament.teams_requests.push(req.body.idTeam);
        tournament.save(function (err) {
            if(err) {
                return res.json({
                    status: 403
                });
            }
            return res.json({
                status: 200
            });
        });
    });
});


module.exports = router;
