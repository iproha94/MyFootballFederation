var express = require('express');
var router = express.Router();
var Match = require('../models/match');
var Team = require('../models/team');
var User = require('../models/user');
var Federation = require('../models/federation');

router.get('/:idMatch', function(req, res, next) {
    var idUser = null;
    if(req.user){
        idUser = req.user._id;
    }
    Match.findById(req.params.idMatch, function (err, match) {
        if(err || !match) {
            return next();
        }
        
        Team.findById(match.team1, function (err, team1) {
            Team.findById(match.team2, function (err, team2) {
                User.find({matchesToReferee: match._id}, function (err, users) {
                    Federation.findById(match.federation, function (err, federation) {
                        var isAdmin = federation.creators.some(
                            (item) => item.toString() == idUser
                        );
                        var result = Object.assign(match.toObject(), {
                            refereeList: users,
                            team1: team1,
                            team2: team2,
                            isAdmin: isAdmin
                        });
                        res.json(result);
                    });
                });
            });
        });
    });
});

module.exports = router;
