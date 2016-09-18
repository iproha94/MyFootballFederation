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

router.get('/:id', function(req, res, next) {
    var id = req.param("id");
    Team.find({_id : id}, function (err, result) {
        if(err || result.length === 0) {
            return res.redirect(303, '/404' );
        }
        //список турниров и кнопка создания турнира

        res.render("team", {
            name: result[0].name
        });

    });
});

module.exports = router;
