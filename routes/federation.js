var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');
var Tournament = require('../models/tournament');

router.post('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
        res.status(403);
        return res.json({
            message: "Нет доступа"
        });
    }

    var federation = new Federation({
        name: req.body.name,
        city: req.body.city,
        creators: [req.user._id]
    });

    federation.save(function (err) {
        if(err) {
            next(err);
        } else {
            res.json({
                name: federation.name
            });
        }
    });
});

router.get('/get', function (req, res, next) {
    Federation.find({creators: req.user._id}, function (err, result) {
        res.json(result);
    });
});

router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    Federation.findOne({name : name}, function (err, result) {
        if(err || !result) {
            res.status(500);
            return res.json({
                message: "error"
            });
        }

        res.json(result);
    });
});

router.get('/get-tournaments/:name', function(req, res, next) {
    Federation.findOne({name : req.params.name}, function (err, federation) {
        Tournament.find({federation: federation._id}, function (err, tournaments) {
            if(err) {
                res.status(500);
                return res.json({
                    message: "error"
                });
            }

            res.json(tournaments);
        });
    });
});



module.exports = router;
