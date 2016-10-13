var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');
var Team = require('../models/team');
var Match = require('../models/match');
var tournamentSetting = require('../lib/tournament');

router.get('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }
    res.render("create-tournament", {config: tournamentSetting.config});
});

router.post('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized');
    }
    Federation.findOne({name: req.query.federation}, function (err, federation) {
        var tournament = new Tournament({
            name: req.body.name,
            time: req.body.time,
            countPeriods: req.body.countPeriods,
            federation: federation._id,
            teams: [],
            team_requests: [],
            type: null,
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

router.get('/add-team', function(req, res, next) {
    console.log("add-team");
    console.log(req.query);
    Tournament.findById(req.query.idTournament, function (err, tournament) {
        tournament.teams.push(req.query.idTeam);
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

router.get('/:idTournament', function(req, res, next) {
    var idTournament = req.params.idTournament;

    Tournament.findById(idTournament, function (err, tournament) {
        if (err) {
            return next(err);
        }

        if (req.query.setstatus == "undertake" && tournament.status.prepare) {
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
            for (var i = 0; i < tournament.teams.length; ++i) {
                for (var j = i + 1; j < tournament.teams.length; ++j) {
                    var match = new Match ({
                        tournament: idTournament,
                        team1: tournament.teams[i],
                        team2: tournament.teams[j]
                    });

                    match.save(callback);
                }
            }
        }

        switch (true) {
            case tournament.status.prepare:
                Team.find({_id: {$in: tournament.teams}}, function (err, teams) {
                    return res.render("tournament-prepare", {
                        tournament: tournament,
                        teams: teams
                    });
                });
                break;

            case tournament.status.undertake:
                Match.find({tournament: tournament._id}, function (err, matches) {
                    return res.render("tournament-undertake", {
                        tournament: tournament,
                        matches: matches
                    });
                });
                break;

            case tournament.status.finished:
                return res.send("3");

            default:
                return res.send("Турнир старой версии");

        }
    });
});

router.get('/get-matches/:idTournament', function(req, res, next) {
    Match.find({tournament: req.params.idTournament}, function (err, matches) {
        return res.json({
            matches: matches
        });
    });
});

router.post('/:idTournament', function(req, res, next) {
    Tournament.findById(req.params.idTournament, function (err, tournament) {
        return res.json(tournament);
    });
});



module.exports = router;
