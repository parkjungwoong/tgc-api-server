var express = require('express');
var router = express.Router();
let gameService = require('../service/gameService.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

var fakeList = [
    {name:'Monster Hunter',id:'01',regCnt:10000,img:'http://t1.daumcdn.net/liveboard/thisisgame/608b63bdbde7493891544f4d8f39cbd9.jpg'}
    ,{name:'League of Legends',id:'02',regCnt:500,img:'http://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2015072417023582815_20150724170543dgame_1.jpg'}
    ,{name:'월드 오프 워크레프트',id:'03',regCnt:500,img:'http://image.zdnet.co.kr/2018/04/06/leespot_LCR5I2hdpzrW.jpg'}
    ,{name:'리니지',id:'04',regCnt:500,img:'https://wstatic-cdn.plaync.com/lineage/v1/img/meta/lineage_fb.jpg'}
];

var fakeEventList = [
     {stDt:20181001,enDt:20181004,eventId:'a1',gameId:'01',title:'몬스터 헌터 이벤트,10/01~10/04'}
    ,{stDt:20181002,enDt:20181002,eventId:'a2',gameId:'02',title:'롤 이벤트,10/02'}
    ,{stDt:20181001,enDt:20181015,eventId:'a3',gameId:'03',title:'와우 이벤트, 10/01~10/15'}
    ,{stDt:20180920,enDt:20181007,eventId:'a4',gameId:'04',title:'리니지 이벤트,09/20~10/07'}
    ,{stDt:20181014,enDt:20181108,eventId:'a5',gameId:'01',title:'몬헌 이벤트,10/14~11/08'}
]

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
 * 게임 조회 http://localhost/games?q=id%3Dterry
 */
router.get('/', function(req, res, next) {
    console.log('game/',req.query);
    var q = req.query;
    res.json(makeResMeg({name:'리니지',id:'04',regCnt:500,img:'https://wstatic-cdn.plaync.com/lineage/v1/img/meta/lineage_fb.jpg',content:'이것은 리니지라는 게임입니다. 그리고 모바일로도 있구요, 한국 아저씨들이 많이 하는 게임입니다. 현질을 많이 유도하구요, 공성전 이런것들이 막 있고 어쩌구 저쩌구 저러구 막 이래저래 와리가리 뒤로 앞으로 좌우로 왔다갔다.'}));
});

/**
 * 구독 가능 게임 리스트
 */
router.get('/list', function(req, res, next) {
    console.log('list res');
    gameService.getGameList(req.query).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err => {
        console.error('구독 가능 게임 리스트 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

/**
 * 구독 중인 게임 조회
 */
router.get('/subscribe/:userId', function(req, res, next) {
    let param = req.query;
    param.userId = req.params.userId;

    gameService.getSubscribeList(param).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err => {
        console.error('구독 중인 게임 조회',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });

});

/**
 * 구독 중인 게임 이벤트 조회 특정 게임
 */
router.get('/event/:userId/game/:gameId', function(req, res, next) {
    res.json(makeResMeg(fakeEventList));
});

/**
 * 구독 중인 게임 이벤트 조회
 */
router.get('/event/:userId', function(req, res, next) {
    res.json(makeResMeg(fakeEventList));
});


/**
 * 내 구독 리스트 조회
 */
router.get('/:id/subscribe/:stNum', function(req, res, next) {
    console.log('body => ',req.params.id);
    res.json(makeResMeg(fakeMyList));
});

/**
 * 구독
 */
router.post('/subscribe', function(req, res, next) {
    gameService.subscribe(req.body).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('구독취소 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

/**
 * 구독 취소
 */
router.delete('/subscribe/:id/game/:gameId',function (req,res,next) {
    gameService.cancelSubscribe(req.params).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('구독취소 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});






module.exports = router;
