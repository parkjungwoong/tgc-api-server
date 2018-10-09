var express = require('express');
var router = express.Router();

function makeResMeg(data){
    return res = {
        resCode : '0000'
        ,resMsg : '정상처리'
        ,result : data
    };
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/info/:id', function(req, res, next) {
    console.log('body => ',req.body);

    res.json(makeResMeg(''));
});

module.exports = router;
