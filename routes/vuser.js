var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var Vuser = require('../models/vuser');

router.post('/create', function(req, res, next) {
    var vuser = new Vuser({
        name: req.body.firstName + " " + req.body.lastName,
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
        Team.findById(req.query.team, function (err, team) {
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
    var id = req.param("id");
    Vuser.findOne({_id : id}, function (err, result) {
        if(err || !result) {
            return next();
        }
        res.json(result);
    });
});

module.exports = router;
