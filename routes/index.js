var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/welcome', function(req, res, next) {
  res.end('hello\n'+new Date);
});

module.exports = router;
