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

                                var currentUserTeam1 = {vplayers: []};
                                var currentUserTeam2 = {vplayers: []};
                                if(team1.creators.some((item) => item.toString() == idUser)
                                    && !match.players1.length){//если массив игроков команды текущего пользователя не пустой - то не показывать выбор игроков для матча
                                    currentUserTeam1 = team1;
                                }
                                if(team2.creators.some((item) => item.toString() == idUser)
                                    && !match.players2.length){
                                    currentUserTeam2 = team2;
                                }

                                Vuser.find({_id: {$in: currentUserTeam1.vplayers}}, function (err, vplayers1) {
                                    Vuser.find({_id: {$in: currentUserTeam2.vplayers}}, function (err, vplayers2) {
                                        if(currentUserTeam1.toObject){
                                            currentUserTeam1 = currentUserTeam1.toObject();
                                            currentUserTeam1.vplayers = vplayers1;
                                        }
                                        if(currentUserTeam2.toObject){
                                            currentUserTeam2 = currentUserTeam2.toObject();
                                            currentUserTeam2.vplayers = vplayers2;
                                        }
                                        var result = Object.assign(match.toObject(), {
                                            refereeList: users,
                                            team1: team1,
                                            team2: team2,
                                            isAdmin: isAdmin,
                                            players1: players1,
                                            players2: players2,
                                            currentUserTeam1: currentUserTeam1,
                                            currentUserTeam2: currentUserTeam2
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
