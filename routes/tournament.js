var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');
var tournamentSetting = require('../lib/tournament');

router.get('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
            return res.redirect(303, '/unauthorized' );
    }

    res.render("create-tournament", {config: tournamentSetting.config});
});

router.post('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
        return res.redirect(303, '/unauthorized' );
    }
    
    Federation.findOne({name: req.query.federation}, function (err, federation) {
        var tournament = new Tournament({
            name: req.body.name,
            federation: federation._id,
            teams: [],
            team_requests: [],
            type: null
        });
        
        tournament.save(function (err) {
            if(err) return res.send("Error");

            res.send("OK");
        });
    });

});

module.exports = router;
