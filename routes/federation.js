var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');

router.get('/create', function(req, res, next) {
    res.render("create-federation");
});

router.post('/create', function(req, res, next) {
    var federation = new Federation({
        name: req.body.name,
        creators: null,
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
    Federation.find({name : name}, function (err, result) {
        if(err || result.length === 0) {
            return res.redirect(303, '/404' );
        }
        //список турниров и кнопка создания турнира

        res.render("federation", {
            name: name,
            tournaments: result.tournaments
        });

    });
});

module.exports = router;
