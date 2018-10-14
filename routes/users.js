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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 *회원 가입
 */
router.post('/:id', function(req, res, next) {
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

/**
 * 내 구독 리스트 조회
 */
router.get('/:id/subscribe/:stNum', function(req, res, next) {
    console.log('body => ',req.params.id);
    res.json(makeResMeg(fakeMyList));
});

/**
 * 구독 저장
 */
router.post('/subscribe', function(req, res, next) {
    console.log('body => ',req.body);
    fakeMyList.push(req.body);
    res.json(makeResMeg(fakeMyList));
});

/**
 * 구독 취소
 */
router.delete('/subscribe/:id/game/:gameId',function (req,res,next) {

});

module.exports = router;
