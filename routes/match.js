var express = require('express');
var router = express.Router();
var Match = require('../models/match');

router.get('/:idMatch', function(req, res, next) {
    Match.findById(req.params.isMatch, function (err, match) {
        if(err) {
            return next(err);
        }
        res.render("match", match);
    });
});

module.exports = router;
