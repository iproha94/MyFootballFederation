var express = require('express');
var router = express.Router();
var async = require('async');
var front = require('../cfg/front.js');

var WebSocketServer = require('ws').Server;

var User = require('../models/user');
var Match = require('../models/match');
var Stage = require('../models/stage');
var Tournament = require('../models/tournament');
var Team = require('../models/team');
var Vuser = require('../models/vuser');
var Federation = require('../models/federation');

var wss = new WebSocketServer({port: front.port});
console.log("WebSocketServer запущен на порту: " + front.port);

router.post('/get-my-matches', function(req, res, next) {
    if (!req.body.idVk) {
        return res.status(400).json([]);
    }

    let idVk = "vkontakte:" + req.body.idVk;

    User.findOne({authId: idVk}, function (err, user) {
        if (user == null) {
            return res.status(404).json([]);
        }

        Match.find({_id: {$in: user.matchesToReferee},  status: Match.STATUS.CREATED.name}, function (err, matches) {

            async.map(matches, function (match, done) {
                Stage.findById(match.stage, function (err, stage) {
                    if (err) done(err);

                    Tournament.findById(stage.tournament, function (err, tournament) {
                        if (err) done(err);

                        Federation.findById(match.federation, function (err, federation) {
                            if (err) done(err);

                            Team.findById(match.team1, function (err, team1) {
                                if (err) done(err);

                                Team.findById(match.team2, function (err, team2) {
                                    if (err) done(err);

                                    done(null, {
                                        idMatch: match._id,
                                        tournament: tournament.name,
                                        matchConfig: tournament.matchConfig,
                                        federation: federation.name,
                                        stage: stage.name,
                                        team1: {
                                            idTeam: team1._id,
                                            name: team1.name,
                                            players: team1.vplayers
                                        },
                                        team2: {
                                            idTeam: team2._id,
                                            name: team2.name,
                                            players: team2.vplayers
                                        },
                                    });
                                });
                            });
                        });
                    });
                })
            }, function (err, matchesArr) {
                if (err)
                    return res.json([]);

                async.map(matchesArr, function (match, done) {
                    Vuser.find({_id: {$in: match.team1.players}}, function (err, vusers) {
                        if (err) done(err);

                        match.team1.players = vusers.map(vuser => {
                            return {
                                idUser: vuser._id,
                                name: vuser.name
                            }
                        });

                        Vuser.find({_id: {$in: match.team2.players}}, function (err, vusers) {
                            if (err) done(err);

                            match.team2.players = vusers.map(vuser => {
                                return {
                                    idUser: vuser._id,
                                    name: vuser.name
                                }
                            });

                            done(null, match);
                        });
                    });
                }, function (err, arr) {
                    return res.status(200).json(arr);
                });
            });
        });
    });
});

router.get('/:idMatch/get-info', function(req, res, next) {
    let idMatch = req.params.idMatch;

    Match.findById(idMatch, function (err, match) {
        if (err) return res.json("матч не найден");
        return res.json(match.events);
    });
});

router.post('/set-info', function(req, res, next) {
    let idMatch = req.body.idMatch;
    let idEvent = req.body.idEvent;
    let idAction = req.body.idAction;
    let minute = req.body.minute;

    if (!idMatch || !idEvent || isNaN(idAction) || isNaN(minute)) {
        return res.status(400).json(null);
    }

    let now = new Date();

    let event = {
        idEvent: idEvent,
        idAction: idAction,
        minute: minute,
        realTime: now,
    };

    Match.findById(idMatch, function (err, match) {
        if (err || !match) {
            return res.status(404).json(null);
        }

        switch (idEvent) {
            case Match.EVENT.MATCH_STARTED.name:
                match.status = Match.STATUS.RUNNING.name;
                break;
            case Match.EVENT.MATCH_FINISHED.name:
                match.status = Match.STATUS.FINISHED.name;
                break;
            case Match.EVENT.GOAL.name:
            case Match.EVENT.OWN_GOAL.name:
            case Match.EVENT.YELLOW_CARD.name:
            case Match.EVENT.RED_CARD.name:
            case Match.EVENT.ASSIST.name:
                event.idTeam = req.body.idTeam;
                event.idPlayer = req.body.idPlayer;
                event.teamName = req.body.teamName;
                event.playerName = req.body.playerName;
                break;
        }

        if (idEvent == Match.EVENT.ASSIST.name) {
            event.idParentAction = req.body.idParentAction;
        }

        match.events.push(event);

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(event));
        });

        match.save(function (err) {
            if (err) {
                return res.status(500).json(null);
            }

            return res.status(200).json(null);
        });
    });
});

router.post('/del-info', function(req, res) {
    let idMatch = req.body.idMatch;
    let idAction = req.body.idAction;

    if (!idMatch || isNaN(idAction)) {
        return res.status(400).json(null);
    }

    Match.findById(idMatch, function (err, match) {
        if (err || !match) {
            return res.status(404).json(null);
        }

        match.events = match.events.filter(obj => {
            return obj.idAction !== idAction;
        });

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({idAction: -idAction}));
        });

        match.save(function (err) {
            if (err) {
                return res.status(500).json(null);
            }

            return res.status(200).json(null);
        });
    });
});


router.get('/add-referee', function(req, res, next) {
    User.findById(req.query.idSend, function (err, user) {
        user.matchesToReferee.push(req.query.idMatch);
        user.save((err) => {
            res.json({status: 200});
        });
    });
});

module.exports = router;
