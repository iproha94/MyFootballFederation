var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Match = require('../models/match');
var WebSocketServer = require('ws').Server;
var server = require('../app');

var wss = new WebSocketServer({ server: server });
var clients = new Set();
wss.on('connection', function connection(ws) {
    clients.add(ws);
    ws.on('close', function() {
        clients.delete(ws);
    });
});


router.get('/:idUser/get-my-matches', function(req, res, next) {
    let idUser = "vkontakte:" + req.params.idUser;
    
    User.findOne({authId: idUser}, function (err, user) {
        if (user == null) {
            return res.json([]);
        }

        Match.find({_id: {$in: user.matchesToReferee}}, function (err, matches) {
            let myMatches = [];

            matches.forEach(function (match, index, array) {
                let newMatch = {
                    idMatch: 1,
                    federation: "federation_name_",
                    tournament: "tournament_name_",
                    stage: "stage_name_",
                    matchConfig: {
                        timePeriod: 1,
                        countPeriods: 2,
                    },
                    team1: {
                        name: "",
                        logo: "http://unsplash.it/100/100?image=1",
                        idTeam: 1,
                        players: [{
                            idUser: 11,
                            name: "player11",
                            image: "http://unsplash.it/100/100?image=11",
                            number: 11
                        }, {
                            idUser: 12,
                            name: "player12",
                            image: "http://unsplash.it/100/100?image=12",
                            number: 12
                        }, {
                            idUser: 13,
                            name: "player13",
                            image: "http://unsplash.it/100/100?image=13",
                            number: 13
                        }]
                    },
                    team2: {
                        name: "",
                        logo: "http://unsplash.it/100/100?image=2",
                        idTeam: 2,
                        players: [{
                            idUser: 21,
                            name: "player21",
                            image: "http://unsplash.it/100/100?image=21",
                            number: 21
                        }, {
                            idUser: 22,
                            name: "player22",
                            image: "http://unsplash.it/100/100?image=22",
                            number: 22
                        }, {
                            idUser: 23,
                            name: "player23",
                            image: "http://unsplash.it/100/100?image=23",
                            number: 23
                        }]
                    }
                };

                newMatch.idMatch = match._id;

                newMatch.team1.name = match.team1.toString().substr(-4, 4);
                newMatch.team1.idTeam = match.team1;
                newMatch.team2.name = match.team2.toString().substr(-4, 4);
                newMatch.team2.idTeam = match.team2;

                myMatches.push(newMatch);
            });

            return res.json(myMatches);


            // let idTeams = [];
            //
            // matches.forEach(function (match, index, array) {
            //     if (idTeams.indexOf(match.team1) == "-1") {
            //         idTeams.push(match.team1);
            //     }
            //     if (idTeams.indexOf(match.team2) == "-1") {
            //         idTeams.push(match.team2);
            //     }
            // });
            //
            // Team.find({_id: {$in: idTeams}}, function (err, teams) {
            //     let myMatches = [];
            //
            //     matches.forEach(function (match, index, array) {
            //         let newMatch = matchPattern;
            //
            //         newMatch.idMatch = match._id;
            //
            //         teams.forEach(function (team, index, array) {
            //             console.log(team._id);
            //             console.log(match.team1);
            //             console.log(team._id == match.team1);
            //
            //             if (team._id == match.team1) {
            //                 newMatch.team1.name = team.name;
            //                 newMatch.team1.idTeam = team._id;
            //             }
            //             if (team._id == match.team2) {
            //                 newMatch.team2.name = team.name;
            //                 newMatch.team2.idTeam = team._id;
            //             }
            //         });
            //
            //         myMatches.push(newMatch);
            //     });
            //
            //     return res.json(myMatches);
            // });
        });
    });
});

router.get('/:idMatch/get-info', function(req, res, next) {
    let idMatch = req.params.idMatch;

    Match.findById(idMatch, function (err, match) {
        return res.json(match.events);
    });
});

router.get('/:idMatch/:number/:data/set-info', function(req, res, next) {
    // let idMatch = req.params.idMatch;
    // let number = req.body.number;
    // let data = req.body.data;
    //
    // Match.findById(idMatch, function (err, match) {
    //     match.events.push({
    //         number: number,
    //         data: data,
    //     });
    //
    //     console.log(req.body);
    //
    //     match.save(function (err) {
    //         return res.json({
    //             status: "OK",
    //             code: 200
    //         });
    //     });
    // });

    let idMatch = req.params.idMatch;
    let number = req.params.number;
    let data = req.params.data;

    clients.forEach((ws) => {
        ws.send(JSON.parse({
            number: number,
            data: data
        }));
    });

    Match.findById(idMatch, function (err, match) {
        match.events.push({
            number: number,
            data: data,
        });

        console.log(req.body);

        match.save(function (err) {
            return res.json({
                status: "OK",
                code: 200
            });
        });
    });

});

router.get('/add-referee', function(req, res, next) {
    console.log("add-referee", req.query);
    User.findById(req.query.idSend, function (err, user) {
        user.matchesToReferee.push(req.query.idMatch);
        user.save((err) => {
            console.log(user);
            res.json({status: 200});
        });
    });
});

module.exports = router;
