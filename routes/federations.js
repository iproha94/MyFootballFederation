var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');

router.get('/', function(req, res, next) {
    res.render("create-federation");
});

router.post('/', function(req, res, next) {
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

module.exports = router;
