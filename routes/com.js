var express = require('express');
var router = express.Router();

let utils = require('../common/utils.js');
let CONST = require('../common/const.js');
let comService = require('../service/comService.js');

/* GET home page. */
router.get('/checkInit/:os/:ver', function(req, res, next) {
    comService.checkAppInit(req.params).then(value=>{
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('checkInit ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL,err));
    });

});


module.exports = router;
