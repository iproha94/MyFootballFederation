var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');
var User = require('../models/user');

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
            name: "Real",
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
    }, {
        idUser: idUser,
        idMatch: 2,
        federation: "federation_name_2",
        tournament: "tournament_name_2",
        stage: "stage_name_2",
        matchConfig: {
            timePeriod: 2,
            countPeriods: 3,
        },
        team1: {
            name: "CSKA",
            logo: "http://unsplash.it/100/100?image=21",
            idTeam: 12,
            players: [{
                idUser: 121,
                name: "Jo",
                image: "http://unsplash.it/100/100?image=22",
                number: 10
            }, {
                idUser: 122,
                name: "Musa",
                image: "http://unsplash.it/100/100?image=23",
                number: 11
            }, {
                idUser: 123,
                name: "Dumbia",
                image: "http://unsplash.it/100/100?image=24",
                number: 37
            }]
        },
        team2: {
            name: "Manchester United",
            logo: "http://unsplash.it/100/100?image=30",
            idTeam: 13,
            players: [{
                idUser: 130,
                name: "Ibra",
                image: "http://unsplash.it/100/100?image=31",
                number: 3
            }, {
                idUser: 131,
                name: "De Hea",
                image: "http://unsplash.it/100/100?image=32",
                number: 8
            }, {
                idUser: 132,
                name: "Mourinio",
                image: "http://unsplash.it/100/100?image=33",
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
