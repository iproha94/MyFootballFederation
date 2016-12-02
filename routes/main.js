var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');
var Team = require('../models/team');
var User = require('../models/user');
var Stage = require('../models/stage');
var Match = require('../models/match');
var async = require('async');
var Tournament = require('../models/tournament');



function getArray(arrayObject, name) {
    var result = [];
    for(let object of arrayObject) {
        result.push(object[name]);
    }
    return result;
}

router.get('/', function(req, res, next) {
    var reg = new RegExp(req.query.term, 'i');
    Federation.find({name: reg}, function (err, result) {
        res.json(getArray(result, "name"));
    });
});

router.get('/get-current-user', function(req, res, next) {
    if (!req.user) {
        return res.json(null);
    }

    Federation.find({creators: req.user._id}, function (err, fResult) {
        Team.find({creators: req.user._id}, function (err, tResult) {
            var result = Object.assign(req.user.toObject(), {
                federations: fResult,
                teams: tResult,
                newUser: Date.now() - req.user.created < 3600000
            });
            res.json(result);
        });
    });
});

router.get('/is-authenticated', function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.json({
            status: 500
        });
    }
    
    res.json({
        status: 200
    });
});


router.get('/users', function(req, res, next) {
    User.find({}, function (err, result) {
        res.json(result);
    });
});

router.get('/get-user/:idUser', function(req, res, next) {
    var idUser = req.params.idUser;
    User.findById(idUser, function (err, user) {
        if(err || !user) {
            return next();
        }
        Federation.find({creators: idUser}, function (err, fResult) {
            Team.find({creators: idUser}, function (err, tResult) {
                var result = Object.assign(user.toObject(), {
                    federations: fResult,
                    teams: tResult
                });
                res.json(result);
            });
        });
    });
});

//тут возможна атака csrf 
router.get('/account/add-creator/', function(req, res, next) {
    var idUser = req.query.idUser;
    var idFederation = req.query.idSend;
    console.log(idUser, idFederation);
    Federation.findById(idFederation, function (err, federation) {
        if(err) {
            return res.json({
                status: 403
            });
        }
        
        var isCreatorsCurrentUser = federation.creators.some(function(item){
            return item.equals(req.user._id);
        });
        if(isCreatorsCurrentUser) {
            federation.creators.push(idUser);
            federation.save(function (err) {
                if(err) {
                    return res.json({
                        status: 403
                    });
                }

                return res.json({
                    status: 200
                });
            });
        } else {
            return res.json({
                status: 403
            });
        }
    });
});

router.post('/account/get-creator/', function(req, res, next) {
    Federation.find({creators: req.user._id}, function (err, federations) {
        return res.json(federations);
    });
});


router.post('/account/save-change/', function(req, res, next) {
    var updateData = { 
        notifications: !!req.body.notifications,
        email: req.body.email
    };
    User.findByIdAndUpdate(req.user._id, { $set: updateData }, { new: true }, function (err, user) {
        if (err) return next(err);
        res.json({
            message: "OK"
        });
    });
});



router.post('/get-interesting-matches', function (req, res, next) {
    let findCond;

    if (req.user) {
        findCond = {
            members: req.user._id
        }
    } else {
        findCond = {};
    }

    Federation.find(findCond, function (err, federations) {
        if (err) return res.json([]);

        async.map(federations, function (fed, doneFederations) {
            let federation = fed.toObject();

            Tournament.find({federation: federation._id}, function (err, tournaments) {
                if (err) doneFederations(err);

                async.map(tournaments, function (tourn, doneTournaments) {
                    let tournament = tourn.toObject();

                    Stage.find({tournament: tournament._id}, function (err, stages) {
                        if (err) doneTournaments(err);

                        let tournamentMatches = [];

                        async.each(stages, function (stage, callback) {
                            Match.find({stage: stage._id}, function (err, matches) {
                                if (err) callback(err);

                                tournamentMatches = tournamentMatches.concat(matches);

                                callback();
                            });
                        }, function (err) {
                            if (err)
                                tournament.matches = [];
                            else
                                tournament.matches = tournamentMatches;

                            doneTournaments(null, tournament);
                        });
                    });

                }, function (err, arr) {
                    federation.tournaments = arr;
                    doneFederations(null, federation);
                });
            })
        }, function (err, arr) {
            return res.json(arr);
        });
    });

});

module.exports = router;
