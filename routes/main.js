var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');

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

module.exports = router;
