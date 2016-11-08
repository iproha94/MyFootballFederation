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
                        
                        var currentUserTeam = null;
                        if(team1.creators.some((item) => item.toString() == idUser)){
                            currentUserTeam = team1;
                        }
                        if(team2.creators.some((item) => item.toString() == idUser)){
                            currentUserTeam = team2;
                        }
                        
                        var result = Object.assign(match.toObject(), {
                            refereeList: users,
                            team1: team1,
                            team2: team2,
                            isAdmin: isAdmin,
                            currentUserTeam: currentUserTeam
                        });
                        res.json(result);
                    });
                });
            });
        });
    });
});

router.get('/set-players', function(req, res, next) {
    var idMatch = req.query.idMatch;
    Match.findById(idMatch, function (err, match) {
        switch(req.query.idTeam) {
            case match.team1.toString():
                req.query.players.forEach((item)=> match.players1.push(item));
                res.json({status: "200"});
                break;
            case match.team2.toString():
                req.query.players.forEach((item)=> match.players2.push(item));
                res.json({status: "200"});
                break;
            default:
                res.status(500);
                res.json({status: "500"});
                break;
        }
        match.save();
    });
});

module.exports = router;
