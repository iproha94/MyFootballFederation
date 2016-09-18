var express = require('express');
var router = express.Router();
var Team = require('../models/team');

router.get('/create', function(req, res, next) {
    res.render("create-team");
});

router.post('/create', function(req, res, next) {
    var team = new Team({
        name: req.body.name,
        creators: [req.user._id],
        players: [],
        federations: [],
        tournaments: [],
        player_requests: []
    });

    team.save(function (err) {
        if(err) return res.send("Error");

        res.send("OK");
    });
});

module.exports = router;
