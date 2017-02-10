var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var Match = require('../models/match');
var Tournament = require('../models/tournament');
var Vuser = require('../models/vuser');
var async = require('async');
var formidable = require('formidable' );
var fs = require('fs');

router.post('/create', function(req, res, next) {
    var team = new Team({
        name: req.body.name.trim(),
        city: req.body.city.trim(),
        creators: [req.user._id],
        players: [],
        player_requests: []
    });

    if (team.name.length == 0 || team.city.length == 0 ) {
        return res.status(400).json({
            message: "ошибка"
        });
    }

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


router.post('/add-banner', function(req, res, next) {
    if(!req.user) {
        return res.status(403).json(null);
    }

    var form = new formidable.IncomingForm();
    form.uploadDir = "uploaded/team";

    //так плохо и некрасиво сделано потому что мы хотим
    //задать имя файла из fields - а его можно получить только в этом методе
    //+ по идее form.parse нужно вызывать после проверки того что 
    //пользователь - капитан этой команды - но без вызова этого метода 
    //мы никак не можем получить id команды
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log('500');
            return res.status(500).json(null);
        }

        Team.findById(fields.team, function (err, team) {
            if (err || !team) {
                return next();
            }
            if(team.creators.some((item) =>
                    item.equals(req.user._id)
                )){
                if(files.banner.size) {//TODO нужно найти более правильный способ проверки пришел ли файл
                    fs.renameSync(files.banner.path,
                        `${form.uploadDir}/banner/${fields.team}.png`);
                } else {
                    fs.unlink(files.banner.path);
                }
                if(files.logo.size) {
                    fs.renameSync(files.logo.path,
                        `${form.uploadDir}/logo/${fields.team}.png`);
                } else {
                    fs.unlink(files.logo.path);
                }

                return res.status(200).json(null);
            }

            fs.unlink(files.banner.path);
            fs.unlink(files.logo.path);
            return res.status(403).json(null);
        });
    });
});

router.post('/add-vuser', function(req, res, next) {
    var vuser = new Vuser({
        name: req.body.firstName + " " + req.body.lastName
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
    var id = req.params.id;
    var idUser = null;
    if(req.user){
        idUser = req.user._id;
    }
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
            team.isAdmin  = team.creators.some(
                (item) => item.toString() == idUser
            );

            Match.find({ $or:[
                {'team1': team._id},
                {'team2': team._id}
            ]}, function (err, matches) {
                team.matches = matches;
                return res.json(team);
            });
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

router.get('/add-creator/', function(req, res, next) {
    if(!req.user) {
        return res.json({
            status: 403
        });
    }
    var idUser = req.query.idUser;
    var idTeam = req.query.idTeam;
    Team.findById(idTeam, function (err, team) {
        if(err || !team) {
            return res.json({
                status: 403
            });
        }

        var isCreatorsCurrentUser = team.creators.some(function(item){
            return item.equals(req.user._id);
        });
        if(isCreatorsCurrentUser) {
            team.creators.push(idUser);
            team.save(function (err) {
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

module.exports = router;
