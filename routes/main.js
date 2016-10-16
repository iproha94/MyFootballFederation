var express = require('express');
var router = express.Router();
var Federation = require('../models/federation');
var Team = require('../models/team');
var User = require('../models/user');
var Mongoose = require('mongoose');
var ObjectId = Mongoose.ObjectId;

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

router.get('/get-current-user', function(req, res, next) {
    res.json(req.user);
});

router.get('/get-user/:idUser', function(req, res, next) {
    User.findById(req.params.idUser, function (err, result) {
        res.json(result);
    });
});

router.get('/users', function(req, res, next) {
    User.find({}, function (err, result) {
        res.json(result);
    });
});

router.get('/account', function(req, res, next) {
    if (!req.isAuthenticated())  {
        return res.redirect('/unauthorized' );
    }

    Federation.find({creators: req.user._id}, function (err, fResult) {
        Team.find({creators: req.user._id}, function (err, tResult) {
            res.render("account", {
                federations:  fResult,
                teams: tResult,
                newUser: Date.now() - req.user.created < 3600000
            });
        });
    });

});

router.get('/account/:idUser', function(req, res, next) {
    var idUser = req.params.idUser;
     if(req.user && idUser == req.user._id.toString()) {
         return res.redirect("/account");
     }

    User.findById(idUser, function (err, user) {
        if(err || !user) {
            return next();
        }
        Federation.find({creators: idUser}, function (err, fResult) {
            Team.find({creators: idUser}, function (err, tResult) {
                res.render("account", {
                    pageUser: user,
                    federations: fResult,
                    teams: tResult
                });
            });
        });
    });
});

//тут возможна атака csrf 
router.get('/account/add-creator/', function(req, res, next) {
    var idUser = req.query.idUser;
    var idFederation = req.query.idSend;
    console.log(idUser, idFederation);
    Federation.findById(idFederation, function (err, federation) {
        var isCreatorsCurrentUser = federation.creators.some(function(item){
            return item.equals(req.user._id);
        });
        if(isCreatorsCurrentUser) {
            federation.creators.push(idUser);
            federation.save(function (err) {
                if(err) {
                    return res.json({
                        status: 403
                    });
                }

                return res.json({
                    status: 200
                });
            });
        } else {
            return res.json({
                status: 403
            });
        }
    });
});

router.post('/account/get-creator/', function(req, res, next) {
    Federation.find({creators: req.user._id}, function (err, federations) {
        return res.json(federations);
    });
});


// router.post('/account', function(req, res, next) {
//     if (req.body.what === 'team' && (req.xhr || req.accepts('json,html')==='json')) {
//         Team.find({creators: req.user._id}, function (err, result) {
//             res.send({
//                 success: true,
//                 teams: result
//             });
//         });
//
//     }
// });

router.get('/unauthorized', function(req, res, next) {
    res.render("unauthorized");
});

module.exports = router;
