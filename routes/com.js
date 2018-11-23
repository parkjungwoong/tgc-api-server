var express = require('express');
var router = express.Router();

let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

/* GET home page. */
router.get('/checkInit/:ver', function(req, res, next) {
    console.info('checkInit',req.query);
    res.json(utils.makeResMeg({result:''}));
});


module.exports = router;
