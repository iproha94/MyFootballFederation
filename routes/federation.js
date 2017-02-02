var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');
var Tournament = require('../models/tournament');
var Match = require('../models/match');
var User = require('../models/user');
var formidable = require('formidable' );
var fs = require('fs');

router.post('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
        res.status(403);
        return res.json({
            message: "Нет доступа"
        });
    }

    var federation = new Federation({
        name: req.body.name.trim(),
        city: req.body.city.trim(),
        creators: [req.user._id],
        members: [req.user._id]
    });

    Federation.findOne({name : federation.name}, function (err, result) {
        if (err || !federation) {
            return next();
        }
    });

    if (federation.name.length == 0 || federation.city.length == 0) {
        return res.status(400).json({
            message: "ошибка"
        });
    }

    federation.save(function (err) {
        if(err) {
            var codeDuplicateKey = 11000;
            if(err.code == codeDuplicateKey) {
                return res.status(403).json({
                    message: "Федерация с таким именем уже существует"
                });
            }

            next(err);
        } else {
            res.json({
                message: "Федерация успешно создана",
                payload: federation
            });
        }
    });
});

router.get('/get-by-creator', function (req, res, next) {
    console.log(req.query.idUser, req.user._id);
    var creator = req.query.idUser || req.user._id;
    Federation.find({creators: creator}, function (err, result) {
        res.json(result);
    });
});

router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    var idUser = null;
    if(req.user){
        idUser = req.user._id;
    }
    Federation.findOne({name : name}, function (err, federation) {
        if(err || !federation) {
            return next();
        }
        
        Match.find({
            federation: federation._id,
            status: Match.STATUS.RUNNING.name,
        }, function (err, runningMatches) {
            var isAdmin = federation.creators.some(
                (item) => item.toString() == idUser
            );
            var result = Object.assign(federation.toObject(),{
                isAdmin: isAdmin,
                runningMatches: runningMatches
            });

            User.find({
                '_id': { $in: result.members}
            }, function(err, users){
                if (err) {
                    result.membersWithName = [];
                } else {
                    result.membersWithName = users;
                }

                return res.json(result);
            });
        });
    });
});

router.get('/get-tournaments/:name', function(req, res, next) {
    Federation.findOne({name : req.params.name}, function (err, federation) {
        if(err || !federation) {
            return res.json({
                status: 404
            });
        }
        Tournament.find({federation: federation._id}, function (err, tournaments) {
            res.json(tournaments);
        });
    });
});

router.get(['/subscribe/:name', '/unsubscribe/:name'], function(req, res, next) {
    if(!req.user) {
        res.status(403);
        return res.json({
            message: "Вы не авторизованы"
        });
    }
    Federation.findOne({name : req.params.name}, function (err, federation) {
        if(err || !federation) {
            return next(err);
        }
        if(federation.members.some((item) => item.toString() == req.user._id)){
            federation.members.pull(req.user._id);
        } else {
            federation.members.push(req.user._id);
        }
        federation.save((err) =>{
            res.json({
                message: "ОК"
            });
        });
    });
});



router.post('/add-banner', function(req, res, next) {
    if(!req.user) {
        return res.status(403).json(null);
    }

    var form = new formidable.IncomingForm();
    form.uploadDir = "uploaded/federation";

    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log('500');
            return res.status(500).json(null);
        }

        console.log(files, fields);
        Federation.findById(fields.federation, function (err, federation) {
            if (err || !federation) {
                return next();
            }
            if(federation.creators.some((item) =>
                    item.equals(req.user._id)
                )){
                if(files.banner.size) {
                    fs.renameSync(files.banner.path,
                        `${form.uploadDir}/banner/${fields.federation}.png`);
                } else {
                    fs.unlink(files.banner.path);
                }

                return res.status(200).json(null);
            }

            fs.unlink(files.banner.path);
            return res.status(403).json(null);
        });
    });
});

module.exports = router;
