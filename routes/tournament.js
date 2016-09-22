var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var Federation = require('../models/federation');

router.get('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
        return res.redirect(303, '/unauthorized' );
    }

    res.render("create-tournament");
});

router.post('/create', function(req, res, next) {
    if (!req.isAuthenticated())  {
        return res.redirect(303, '/unauthorized' );
    }

    console.log(req.query);
    console.log(req.body);
    Federation.findOne({name: req.query.federation}, function (err, federation) {
        var tournament = new Tournament({
            name: req.body.name,
            federation: federation._id,
            teams: [],
            team_requests: []
        });
        
        tournament.save(function (err) {
            if(err) return res.send("Error");

            res.send("OK");
        });
    });

});

module.exports = router;
