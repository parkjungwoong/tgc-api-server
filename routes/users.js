var express = require('express');
var router = express.Router();
let userService = require('../service/userService.js');

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
    console.log('body => ',req.body);
    //todo: 응답으로 회원정보(등급,회원 고유번호,등)
    userService.getUser(req.body.id).then(value => {
        res.json(value);
    });
});
/**
 *회원 가입
 */
router.post('/', function(req, res, next) {
    console.log('body => ',req.body);
    userService.addUser(req.body).then(value => {
        res.json(makeResMeg(value));
    });
});
/**
 * 회원 정보 갱신
 */
router.put('/:id', function(req, res, next) {
    console.log('body => ',req.body);

    res.json(makeResMeg(''));
});

router.get('/:id/message', function(req, res, next) {
    console.log('list res');
    res.json(makeResMeg(fakeMessage));
});




module.exports = router;
