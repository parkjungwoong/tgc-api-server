var express = require('express');
var router = express.Router();
var dao = require('../dao/dao.js');

router.get('/test/:id', function(req, res, next) {
    var ee = req.params.id;
    dao.selectGameList(ee).then(value => {
        res.json(value);
    });
});

/* GET home page. */
router.get('/welcome', function(req, res, next) {

  res.end('hello\n'+new Date);
});


module.exports = router;
