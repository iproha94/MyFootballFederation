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
            res.redirect("/stage/" + stage._id);
        });
    });

});



router.get('/:idStage', function(req, res, next) {
    var idStage = req.params.idStage;

    Stage.findById(idStage, function (err, stage) {
        Match.find({_id: {$in: stage.matches}}, function (err, matches) {
            if (err) {
                return next(err);
            }

            return res.render("stage", {
                stage: stage,
                matches: matches
            });
        });
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
                match.save(function (err) {
                    if(err) {
                        console.log("ошибка сохранения матча");
                        return next(err);
                    }

                    stage.matches.push(match._id);

                    stage.save(function (err) {
                        if(err) {
                            console.log("ошибка сохранения этапа после добавления матчей");
                            return next(err);
                        }
                    });

                })
            });

            return res.redirect('/stage/' + idStage);
        });
    });
});

module.exports = router;