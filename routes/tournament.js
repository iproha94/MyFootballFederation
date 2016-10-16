var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');
var Stage = require('../models/stage');
var Team = require('../models/team');

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

        var tournament = new Tournament({
            name: req.body.name,
            federation: federation._id,
            teams: [],
            team_requests: [],
            tournamentConfig: Tournament.tournamentConfig,
            matchConfig: Tournament.matchConfig,
        });

        tournament.tournamentConfig.countPlayersOnField = parseInt(req.body.countPlayersOnField);
        tournament.tournamentConfig.countPlayersInTeam = parseInt(req.body.countPlayersInTeam);

        tournament.matchConfig.timePeriod = parseInt(req.body.timePeriod);
        tournament.matchConfig.countPeriods = parseInt(req.body.countPeriods);

        tournament.save(function (err) {
            if(err) {
                return next(err);
            }
            res.redirect("/tournament/" + tournament._id);
        });
    });

});

router.get('/:idTournament', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }

    var idTournament = req.params.idTournament;

    Tournament.findById(idTournament, function (err, tournament) {
        if (err) {
            return next(err);
        }

        Stage.find({tournament: tournament._id}, function (err, stages) {
            Team.find({_id: {$in: tournament.teams_requests}}, function (err, teams) {
                return res.render("tournament", {
                    tournament: tournament,
                    stages: stages,
                    teams: teams
                });
            });

        });

    });
});

router.post('/add-team', function(req, res, next) {
    Tournament.findById(req.body.idTournament, function (err, tournament) {
        if (tournament.teams_requests.indexOf(req.body.idTeam) != -1) {
            console.log("team is had already");
            return res.json({
                status: 403
            });
        }

        tournament.teams_requests.push(req.body.idTeam);
        tournament.save(function (err) {
            if(err) {
                return res.json({
                    status: 403
                });
            }

            console.log("team added successful");
            return res.json({
                status: 200
            });
        });
    });
});

module.exports = router;
