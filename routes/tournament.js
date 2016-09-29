var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');
var Team = require('../models/team');
var tournamentSetting = require('../lib/tournament');

router.get('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }
    res.render("create-tournament", {config: tournamentSetting.config});
});

router.post('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }
    Federation.findOne({name: req.query.federation}, function (err, federation) {
        var tournament = new Tournament({
            name: req.body.name,
            time: req.body.time,
            countPeriods: req.body.countPeriods,
            federation: federation._id,
            teams: [],
            team_requests: [],
            type: null
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
        if(err) {
            return next(err);
        }

        Team.find({_id: {$in: tournament.teams}}, function (err, teams) {
            res.render("tournament", {
                tournament: tournament,
                teams: teams
            });
        });
    });
});

module.exports = router;
