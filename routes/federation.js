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
        creators: [req.user._id],
        tournaments: [],
        team_requests: []
    });

    federation.save(function (err) {
        if(err) {
            res.send("Error");
        } else {
            res.send("OK");
        }
    });
});

router.get('/:name', function(req, res, next) {
    var name = req.param("name");
    Federation.findOne({name : name}, function (err, federation) {
        if(err || !federation) {
            return res.redirect(303, '/404' );
        }

        Tournament.find({federation: federation._id}, function (err, tournaments) {
            res.render("federation", {
                name: name,
                tournaments: tournaments
            });
        });
    });
});

module.exports = router;
