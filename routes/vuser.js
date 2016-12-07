var express = require('express');
var router = express.Router();
var Vuser = require('../models/vuser');

router.post('/get', function(req, res, next) {
    if (!req.body.id) {
        return res.status(400).json(null);
    }

    Vuser.findById(req.body.id, (err, vuser) => {
        if(err || !vuser) {
            return res.status(404).json(null);
        }

        return res.status(200).json(vuser);
    });
});

module.exports = router;
