var express = require('express');
var router = express.Router();
var Match = require('../models/match');
var Team = require('../models/team');
var User = require('../models/user');
var Vuser = require('../models/vuser');
var Federation = require('../models/federation');
var async = require('async');

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
                        Vuser.find({_id: {$in: match.players1}}, function (err, players1) {
                            Vuser.find({_id: {$in: match.players2}}, function (err, players2) {
                                var isAdmin = federation.creators.some(
                                    (item) => item.toString() == idUser
                                );

                                var currentUserTeam = {vplayers: []};
                                if(team1.creators.some((item) => item.toString() == idUser)){
                                    currentUserTeam = team1;
                                }
                                if(team2.creators.some((item) => item.toString() == idUser)){
                                    currentUserTeam = team2;
                                }

                                Vuser.find({_id: {$in: currentUserTeam.vplayers}}, function (err, vplayers) {
                                    console.log(vplayers);
                                    if(currentUserTeam.toObject){
                                        currentUserTeam = currentUserTeam.toObject();
                                        currentUserTeam.vplayers = vplayers;
                                    }
                                    var result = Object.assign(match.toObject(), {
                                        refereeList: users,
                                        team1: team1,
                                        team2: team2,
                                        isAdmin: isAdmin,
                                        currentUserTeam: currentUserTeam,
                                        players1: players1,
                                        players2: players2
                                    });
                                    res.json(result);
                                });
                            });
                        });
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
