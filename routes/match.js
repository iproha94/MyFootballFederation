var express = require('express');
var router = express.Router();
var Match = require('../models/match');
var Team = require('../models/team');
var User = require('../models/user');

router.get('/:idMatch', function(req, res, next) {
    Match.findById(req.params.idMatch, function (err, match) {
        if(err || !match) {
            return next();
        }
        
        Team.findById(match.team1, function (err, team1) {
            Team.findById(match.team2, function (err, team2) {
                User.find({matchesToReferee: match._id}, function (err, users) {
                    res.json({
                        refereeList: users,
                        match: match,
                        team1: team1,
                        team2: team2,
                        isFederationCreator: true//можно ли назначить судью
                    });
                });
            });
        });
    });
});

module.exports = router;
