var express = require('express');
var router = express.Router();

function makeResMeg(data){
    return res = {
        resCode : '0000'
        ,resMsg : '정상처리'
        ,result : data
    };
}

var fakeMyList = [{gameName: 'Monster Hunter', gameId: '01', img: 'http://t1.daumcdn.net/liveboard/thisisgame/608b63bdbde7493891544f4d8f39cbd9.jpg', regDt: '20181014', isNew: 'false'}
                ,{gameName: '리니지', gameId: '04', img: 'https://wstatic-cdn.plaync.com/lineage/v1/img/meta/lineage_fb.jpg', regDt: '20181001', isNew: 'true'}];

/**
 * 로그인
 */
router.post('/login',function (req,res,next) {
    console.log('body => ',req.body);
    //todo: 응답으로 회원정보(등급,회원 고유번호,등)
    res.json(makeResMeg({userNo:'1234',userName:'박정웅'}));
})
/**
 *회원 가입
 */
router.post('/', function(req, res, next) {
    console.log('body => ',req.body);

    res.json(makeResMeg(''));
});
/**
 * 회원 정보 갱신
 */
router.put('/:id', function(req, res, next) {
    console.log('body => ',req.body);

    res.json(makeResMeg(''));
});


module.exports = router;
