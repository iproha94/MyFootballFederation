var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');
var Team = require('../models/team');

function getArray(arrayObject, name) {
    var result = [];
    for(let object of arrayObject) {
        result.push(object[name]);
    }
    return result;
}

router.get('/', function(req, res, next) {
    if(req.xhr || req.accepts('json,html' )==='json' ){
        var reg = new RegExp(req.query.term, 'i');
        Federation.find({name: reg}, function (err, result) {
            res.status(200);
            res.json(getArray(result, "name"));
        });
    } else {
        res.render("main");
    }
});

router.get('/account', function(req, res, next) {
    if (!req.user) return res.render("unauthorized");

    //TODO: исправить на список федераций только этого человека
    Federation.find(function (err, fResult) {
        Team.find(function (err, tResult) {
            res.render("account", { 
                username: req.user.name,
                federations:  fResult,
                teams: tResult
            });
        });
    });
});

router.get('/unauthorized', function(req, res, next) {
    res.render("unauthorized");
});

module.exports = router;