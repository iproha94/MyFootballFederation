var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');

router.get('/:idUser/get-my-matches', function(req, res, next) {
    // Federation.find({creators: req.user._id}, function (err, federations) {
    //     return res.json(federations);
    // });

    let idUser = req.params.idUser;

    myMathes = [{
        idUser: idUser,
        idMatch: 1,
        federation: "federation_name_1",
        tournament: "tournament_name_1",
        stage: "stage_name_1",
        matchConfig: {
            timePeriod: 25,
            countPeriods: 2,
        },
        team1: {
            name: "Zenit",
            logo: "http://unsplash.it/100/100?image=0",
            idTeam: 10,
            players: [{
                idUser: 100,
                name: "Andrey Arshavin",
                image: "http://unsplash.it/100/100?image=1",
                number: 10
            }, {
                idUser: 101,
                name: "Aleksandr Kerzhakov",
                image: "http://unsplash.it/100/100?image=2",
                number: 11
            }, {
                idUser: 102,
                name: "Vyacheslav Malajeev",
                image: "http://unsplash.it/100/100?image=3",
                number: 37
            }]
        },
        team2: {
            name: "Real-Madrid",
            logo: "http://unsplash.it/100/100?image=10",
            idTeam: 11,
            players: [{
                idUser: 110,
                name: "Roberto Carlos",
                image: "http://unsplash.it/100/100?image=11",
                number: 3
            }, {
                idUser: 111,
                name: "Raul",
                image: "http://unsplash.it/100/100?image=12",
                number: 8
            }, {
                idUser: 112,
                name: "Zinedin Zidane",
                image: "http://unsplash.it/100/100?image=13",
                number: 7
            }]
        }
    }];

    return res.json(myMathes);
});

var events = [];

router.get('/:idMatch/get-info', function(req, res, next) {
    return res.json(events);
});

router.get('/:idMatch/set-info', function(req, res, next) {
    let idMatch = req.params.idMatch;
    let number = req.query.number;
    let data = req.query.data;

    events.push({
        number: number,
        data: data,
        idMatch: idMatch,
    });

    return res.json({
        status: "OK",
        code: 200
    });
});

module.exports = router;
