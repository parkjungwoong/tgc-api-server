var express = require('express');
var router = express.Router();

let userService = require('../service/userService.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

function makeResMeg(data){
    return res = {
        resCode : '0000'
        ,resMsg : '정상처리'
        ,result : data
    };
};

var fakeMessage = [
    {id:'1',content:'공지사항입니다.',data:'',sendDt:'20181028'}
    ,{id:'2',content:'광고입니다..',data:'',sendDt:'20181021'}
];
/**
 * 로그인
 */
router.post('/login',function (req,res,next) {
    userService.getUser(req.body.id).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('회원 가입 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
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
