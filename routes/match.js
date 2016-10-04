var express = require('express');
var router = express.Router();
var Match = require('../models/match');
var Team = require('../models/team');

router.get('/:idMatch', function(req, res, next) {
    Match.findById(req.params.idMatch, function (err, match) {
        if(err) {
            return next(err);
        }
        
        Team.findById(match.team1, function (err, team1) {
            Team.findById(match.team2, function (err, team2) {
                res.render("match", {
                    match: match,
                    team1: team1,
                    team2: team2
                });
            });
        });
    });
});

module.exports = router;
