var express = require('express');
var router = express.Router();

var fakeList = [
    {name:'Monster Hunter',id:'01',regCnt:10000,img:'http://t1.daumcdn.net/liveboard/thisisgame/608b63bdbde7493891544f4d8f39cbd9.jpg'}
    ,{name:'League of Legends',id:'02',regCnt:500,img:'http://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2015072417023582815_20150724170543dgame_1.jpg'}
    ,{name:'월드 오프 워크레프트',id:'03',regCnt:500,img:'http://image.zdnet.co.kr/2018/04/06/leespot_LCR5I2hdpzrW.jpg'}
    ,{name:'리니지',id:'04',regCnt:500,img:'https://wstatic-cdn.plaync.com/lineage/v1/img/meta/lineage_fb.jpg'}
];

var fakeMyList = [

];

function makeResMeg(data){
    return res = {
        resCode : '0000'
        ,resMsg : '정상처리'
        ,result : data
    };
}
/**
 * 구독 가능 게임 리스트
 */
router.get('/list', function(req, res, next) {
    console.log('list res');
    res.json(makeResMeg(fakeList));
});

/**
 * 구독 저장
 */
router.post('/add', function(req, res, next) {
    console.log('body => ',req.body);
    fakeMyList.push(req.body);
    res.json(makeResMeg(fakeMyList));
});

/**
 * 구독 리스트
 */
router.get('/myList', function(req, res, next) {
    res.json(makeResMeg(fakeMyList));
});



module.exports = router;
