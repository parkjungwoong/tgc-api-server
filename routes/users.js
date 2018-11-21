var express = require('express');
var router = express.Router();

let userService = require('../service/userService.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

/**
 * 로그인
 */
router.post('/login',function (req,res,next) {
    userService.getUser(req.body).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('회원 가입 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL,err));
    });
});
/**
 *회원 가입
 */
router.post('/', function(req, res, next) {
    userService.addUser(req.body).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('회원 가입 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});
/**
 * 회원 정보 갱신
 */
router.put('/:userNo', function(req, res, next) {
    let param = Object.assign(req.body,req.params);

    userService.updateUserInfo(param).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('회원 정보 갱신 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

/**
 * 메시지 리스트 조회
 */
router.get('/:userNo/message', function(req, res, next) {
    let param = Object.assign(req.query,req.params);

    userService.getMessageList(param).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('메시지 리스트 조회 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});




module.exports = router;
