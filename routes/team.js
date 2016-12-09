var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var Tournament = require('../models/tournament');
var Vuser = require('../models/vuser');
var async = require('async');

router.post('/create', function(req, res, next) {
    var team = new Team({
        name: req.body.name,
        city: req.body.city,
        creators: [req.user._id],
        players: [],
        player_requests: []
    });

    team.save(function (err) {
        if(err) {
            return res.status(500).json({
                message: "ошибка"
            });
        }

        return res.status(200).json({
            message: "Команда успешно создана",
            payload: team
        });
    });
});

router.post('/add-vuser', function(req, res, next) {
    var vuser = new Vuser({
        name: req.body.firstName + " " + req.body.lastName,
    });

    var promise = vuser.save(function (err) {
        if(err) {
            res.status(500);
            return res.json({
                message: "что-то не так"
            });
        }
    });

    promise.then(function () {
        Team.findById(req.body.team, function (err, team) {
            if(err || !team) {
                return next();
            }

            team.vplayers.push(vuser._id);

            team.save(function (err) {
                if (err) {
                    console.log("ERROR vuser add in team");
                }

                res.json({
                    _id: vuser._id
                });
            });
        })
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.param("id");
    Team.findById(id, function (err, result) {
        if(err || !result) {
            return next();
        }

        async.map(result.vplayers, function (vplayer, done) {
            Vuser.findById(vplayer, function (err, vuser) {
                if(err) return done(err);

                done(null, {
                    _id: vuser._id,
                    name: vuser.name
                })
            });

        }, function (err, arr) {
            var team = result.toObject();
            team.vplayersWithName = arr;
            return res.json(team);
        });
    });
});

router.post('/get-team', function(req, res, next) {
    Team.find({creators: req.user._id}, function (err, result) {
        return res.json(result);
    });
});

router.post('/get-team-by-tournament/:idTournament', function(req, res, next) {
    Tournament.findById(req.params.idTournament, function (err, tournament) {
        if(err || !tournament) {
            return next(err);
        }
        Team.find({_id: {$in: tournament.teams_requests}}, function (err, teams) {
            return res.json(teams);
        });
    });
});
module.exports = router;
