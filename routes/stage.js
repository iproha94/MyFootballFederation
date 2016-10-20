var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Stage = require('../models/stage');
var Match = require('../models/match');

router.get('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }
    res.render("create-stage");
});

router.post('/create', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/unauthorized' );
    }

    Tournament.findOne({_id: req.query.tournament}, function (err, tournament) {

        var stage = new Stage({
            name: req.body.name,
            tournament: tournament._id,
            teams: [],
            matches: [],
            type: Stage.types.liga,
        });

        stage.save(function (err) {
            if(err) {
                return next(err);
            }
            res.json({
                _id: stage._id
            })
        });
    });

});


router.get('/get-matches/:idStage', function(req, res, next) {
    Match.find({stage: req.params.idStage}, function (err, matches) {
        return res.json(matches);
    });
});



router.get('/:idStage', function(req, res, next) {
    var idStage = req.params.idStage;

    Stage.findById(idStage, function (err, stage) {
        return res.json(stage);
    });
});

router.get('/:idStage/start', function(req, res, next) {
    var idStage = req.params.idStage;

    Stage.findById(idStage, function (err, stage) {
        if (err) {
            return next(err);
        }

        Tournament.findById(stage.tournament, function (err, tournament) {
            let matches = Stage.types.liga.createMatches(tournament.teams_requests, 1);

            console.log(matches);

            matches.forEach(function (match, index, array) {
                match.stage = idStage;
                match.name = match.team1 + " vs " + match.team2;

                match.save(function (err) {
                    if(err) {
                        console.log("ошибка сохранения матча");
                        return next(err);
                    }

                    if (index == matches.length - 1) {
                        console.log("все мачти добавлены");
                        return res.json({
                            "status": "OK"
                        });
                    }
                });
            });
        });
    });
});

module.exports = router;