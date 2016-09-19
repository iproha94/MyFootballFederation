var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');

router.get('/create', function(req, res, next) {
    res.render("create-tournament");
});

router.post('/create', function(req, res, next) {
    console.log(req.query);
    console.log(req.body);
    Federation.findOne({name: req.query.federation}, function (err, result) {
        var tournament = new Tournament({
            name: req.body.name,
            federation: result._id,
            teams: [],
            matches: [],
            team_requests: []
        });
        
        tournament.save(function (err) {
            if(err) return res.send("Error");

            result.tournaments.push(tournament._id);
            result.save(function (err) {
                if(err) return res.send("Error");
                console.log(result);
                res.send("OK");
            });
        });
    });

});

module.exports = router;
