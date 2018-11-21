let express = require('express');
let router = express.Router();

let gameService = require('../service/gameService.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

/**
 * 게임 조회
 */
router.get('/', function(req, res, next) {
    gameService.searchGame(req.query).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('게임 조회 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

/**
 * 구독 가능 게임 리스트
 */
router.get('/list', function(req, res, next) {
    gameService.getGameList(req.query).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err => {
        console.error('구독 가능 게임 리스트 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL,err));
    });
});

/**
 * 구독 중인 게임 조회
 */
router.get('/subscribe/:userNo', function(req, res, next) {
    let param = Object.assign(req.query,req.params);

    gameService.getSubscribeList(param).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err => {
        console.error('구독 중인 게임 조회',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });

});

/**
 * 구독 중인 게임 이벤트 조회 - 특정 게임
 */
router.get('/event/gameInfo/:gameId', function(req, res, next) {
    let param = Object.assign(req.query,req.params);

    gameService.getGameEventList(param).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('구독 중인 게임 이벤트 조회 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

/**
 * 구독 중인 게임 이벤트 조회 ( 특정 월 또는 주 )
 */
router.get('/event/:userNo', function(req, res, next) {
    let param = Object.assign(req.query,req.params);

    gameService.getSubscribeEventList(param).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('구독 중인 게임 이벤트 조회 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

/**
 * 구독
 */
router.post('/subscribe', function(req, res, next) {
    gameService.subscribe(req.body).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('구독 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL,err));
    });
});

/**
 * 구독 취소
 */
router.delete('/subscribe/:userNo/game/:_id',function (req,res,next) {
    gameService.cancelSubscribe(req.params).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('구독취소 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

/**
 * 사용자 알림 추가
 */
router.post('/remind',function (req,res,next) {
    gameService.insertRemindInfo(req.body).then(value => {
        res.json(utils.makeResMeg({result:value}));
    }).catch(err=>{
        console.error('구독취소 ERR',err);
        res.json(utils.makeResMeg(CONST.FAIL));
    });
});

//todo: 리마인드 삭제, 수정 ??

module.exports = router;
