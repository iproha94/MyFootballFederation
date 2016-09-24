var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');
var Tournament = require('../models/tournament');

router.get('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
        return res.redirect(303, '/unauthorized' );
    }
    res.render("create-federation");
});

router.post('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
        return res.redirect(303, '/unauthorized' );
    }

    var federation = new Federation({
        name: req.body.name,
        creators: [req.user._id]
    });

    federation.save(function (err) {
        if(err) {
            next(err);
        } else {
            res.redirect("/federation/" + federation.name);
        }
    });
});

router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    Federation.findOne({name : name}, function (err, federation) {
        if(err || !federation) {
            return next(err);
        }

        Tournament.find({federation: federation._id}, function (err, tournaments) {
            if(err) {
                return next(err);
            }
            res.render("federation", {
                federation: federation,
                tournaments: tournaments
            });
        });
    });
});

module.exports = router;
