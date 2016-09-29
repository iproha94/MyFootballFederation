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
        city: req.body.city,
        motto: req.body.motto,
        players: [],
        player_requests: []
    });
    
    team.save(function (err) {
        if(err) return res.send("Error");
        
        res.send("OK");
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.param("id");
    Team.findOne({_id : id}, function (err, result) {
        if(err) return res.redirect(303, '/404' );

        res.render("team", {
            name: result.name
        });
    });
});

module.exports = router;
