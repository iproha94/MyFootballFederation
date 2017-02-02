var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');
var Stage = require('../models/stage');
var async = require('async');
var Match = require('../models/match');


router.post('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        return res.json({
            message: "Пошел к черту"
        });
    }

    Federation.findOne({name: req.body.federation}, function (err, federation) {
        if (err) {
            console.log(req.body);
            return res.json({
                message: "Error"
            });
        }

        var tournament = new Tournament({
            name: req.body.name,
            federation: federation._id,
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
            res.json({
                message: "OK",
                _id: tournament._id
            });
        });
    });

});

router.get('/add-team', function(req, res, next) {
    Tournament.findById(req.query.idTournament, function (err, tournament) {
        if(!tournament.teams_requests.some((item) => item.toString() == req.query.idSend)){
            tournament.teams_requests.push(req.query.idSend);
            tournament.save(function (err) {
                if(err) {
                    return res.json({
                        status: 403
                    });
                }
                return res.json({
                    status: 200,
                    message: "Команда успешно добавлена"
                });
            });
        } else {
            return res.json({
                message: "Эта команда уже участвует"
            });
        }
    });
});


router.get('/get-stage/:idTournament', function (req, res, next) {
    Stage.find({tournament: req.params.idTournament}, function (err, stages) {
        var resultStages = [];
        async.each(stages, function (stage, callback) {
            Match.find({stage: stage._id}, function (err, matches) {
                if (err) callback(err);
                var resultStage = stage.toObject();
                resultStage.matches = matches;
                resultStages.push(resultStage);
                callback();
            });
        }, function (err) {
            if (err) {
                return res.status(500).json(null);
            }

            res.json(resultStages);
        });
    });


});


router.get('/get-stages-with-mathes/:idTournament', function (req, res, next) {
    Stage.find({tournament: req.params.idTournament}, function (err, stages) {
        res.json(stages);
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
            if (err) {
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


router.get('/:idTournament', function(req, res, next) {
    var idUser = null;
    if(req.user){
        idUser = req.user._id;
    }
    Tournament.findById(req.params.idTournament, function (err, tournament) {
        if(err || !tournament) {
            return next();
        }
        Federation.findById(tournament.federation, function (err, federation) {
            var isAdmin = federation.creators.some(
                (item) => item.toString() == idUser
            );
            var result = Object.assign(tournament.toObject(),{
                isAdmin: isAdmin
            });
            return res.json(result);
        });
    });
});
            
module.exports = router;
